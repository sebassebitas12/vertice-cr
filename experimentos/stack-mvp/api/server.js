const cors = require("cors");
const express = require("express");
const { z } = require("zod");

const app = express();
const port = Number(process.env.PORT) || 4000;
const materials = ["ASA", "PLA", "PETG", "ABS", "TPU"];
const materialSchema = z.enum(materials);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Idempotency-Key"],
  }),
);
app.use(express.json({ limit: "32kb" }));

const demoCatalog = require("./catalog-data.json");

const requestSchema = z.object({
  productId: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().optional(),
  ),
  description: z.string().trim().min(1).max(1000),
  useCase: z.string().trim().min(1).max(500),
  quantity: z.coerce.number().int().min(1).max(1000),
  preferredMaterial: z.preprocess(
    (value) => (value === "" ? undefined : value),
    materialSchema.optional(),
  ),
});

const demoRequests = [];
const idempotencyRecords = new Map();

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "vertice-mvp-demo-api" });
});

app.get("/api/catalog", (req, res) => {
  const query = String(req.query.q || "").trim().toLocaleLowerCase("es");
  const data = query
    ? demoCatalog.filter((item) =>
        [item.name, item.family, item.description, ...(item.searchTerms || [])]
          .join(" ")
          .toLocaleLowerCase("es")
          .includes(query),
      )
    : demoCatalog;

  res.json({
    ok: true,
    data,
    meta: { demoOnly: true },
  });
});

app.get("/api/catalog/:slug", (req, res) => {
  const product = demoCatalog.find((item) => item.slug === req.params.slug);
  if (!product) return res.status(404).json({ ok: false, error: "La pieza no existe." });
  res.json({ ok: true, data: product, meta: { demoOnly: true } });
});

app.post("/api/requests", (req, res) => {
  const parsed = requestSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: "Revisa los datos de la solicitud.",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  if (
    parsed.data.productId &&
    !demoCatalog.some((item) => item.id === parsed.data.productId)
  ) {
    return res.status(404).json({
      ok: false,
      error: "La pieza de demostración no existe.",
    });
  }

  const idempotencyKey = String(req.get("Idempotency-Key") || "").trim();
  if (idempotencyKey && idempotencyRecords.has(idempotencyKey)) {
    return res.status(200).json({
      ok: true,
      data: idempotencyRecords.get(idempotencyKey),
      meta: { demoOnly: true, persistence: "memory", replayed: true },
    });
  }

  const record = {
    id: "demo-request-" + String(demoRequests.length + 1).padStart(3, "0"),
    ...parsed.data,
    status: "PENDING_QUOTE",
    price: null,
    createdAt: new Date().toISOString(),
  };
  demoRequests.push(record);

  if (idempotencyKey) {
    idempotencyRecords.set(idempotencyKey, record);
  }

  return res.status(201).json({
    ok: true,
    data: record,
    meta: { demoOnly: true, persistence: "memory", replayed: false },
  });
});

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: "Ruta no encontrada." });
});

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ ok: false, error: "El JSON enviado no es válido." });
  }
  return res.status(500).json({ ok: false, error: "Error interno de la API demo." });
});

app.listen(port, () => {
  console.log("Vértice MVP demo API listening on http://localhost:" + port);
});
