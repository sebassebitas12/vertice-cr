"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createRequest, type DemoRequest } from "../lib/api";
import { requestSchema, type RequestFormValues } from "../lib/request-schema";

type RequestFormProps = { productId?: string };
type IdempotencyRecord = { payload: string; key: string };

export default function RequestForm({ productId }: RequestFormProps) {
  const [keyRecord, setKeyRecord] = useState<IdempotencyRecord | null>(null);
  const [savedRequest, setSavedRequest] = useState<DemoRequest | null>(null);
  const {
    register, handleSubmit, setError, clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RequestFormValues>({
    defaultValues: { productId: productId || "", description: "", useCase: "", quantity: 1, preferredMaterial: "" },
  });

  async function onSubmit(values: RequestFormValues) {
    clearErrors();
    setSavedRequest(null);
    const parsed = requestSchema.safeParse({
      ...values, productId: productId || "", quantity: Number(values.quantity),
    });

    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field === "description" || field === "useCase" || field === "quantity" || field === "preferredMaterial") {
          setError(field, { type: "manual", message: issue.message });
        }
      }
      return;
    }

    try {
      const payload = JSON.stringify(parsed.data);
      const key = keyRecord?.payload === payload ? keyRecord.key : crypto.randomUUID();
      if (keyRecord?.payload !== payload) setKeyRecord({ payload, key });
      setSavedRequest(await createRequest(parsed.data, key));
    } catch (error) {
      setError("root.server", {
        type: "server",
        message: error instanceof Error ? error.message : "No se pudo enviar la solicitud. Inténtalo de nuevo.",
      });
    }
  }

  return (
    <>
      <form className="request-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-heading"><span>Tu solicitud</span><span>Todos los campos ayudan</span></div>
        {errors.root?.server?.message && <div className="form-error" role="alert">{errors.root.server.message}</div>}
        <div className="field">
          <label htmlFor="description">¿Qué pieza necesitas?</label>
          <textarea id="description" placeholder="Describe la forma, el tamaño aproximado o la pieza que quieres reemplazar."
            aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "description-error" : "description-help"}
            {...register("description")} />
          {errors.description
            ? <span className="field-error" id="description-error">{errors.description.message}</span>
            : <span className="field-help" id="description-help">Puedes empezar con una explicación sencilla.</span>}
        </div>
        <div className="field">
          <label htmlFor="useCase">¿Para qué se usará?</label>
          <textarea id="useCase" placeholder="Por ejemplo: mantener un cable ordenado en una mesa de trabajo."
            aria-invalid={Boolean(errors.useCase)} aria-describedby={errors.useCase ? "useCase-error" : undefined}
            {...register("useCase")} />
          {errors.useCase && <span className="field-error" id="useCase-error">{errors.useCase.message}</span>}
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="quantity">¿Cuántas piezas?</label>
            <input id="quantity" type="number" min="1" max="1000" aria-invalid={Boolean(errors.quantity)}
              aria-describedby={errors.quantity ? "quantity-error" : undefined} {...register("quantity", { valueAsNumber: true })} />
            {errors.quantity && <span className="field-error" id="quantity-error">{errors.quantity.message}</span>}
          </div>
          <div className="field">
            <label htmlFor="preferredMaterial">¿Tienes un material en mente?</label>
            <select id="preferredMaterial" {...register("preferredMaterial")}>
              <option value="">Aún no lo sé</option><option value="PLA">PLA</option><option value="PETG">PETG</option>
              <option value="ASA">ASA</option><option value="ABS">ABS</option><option value="TPU">TPU</option>
            </select>
            <span className="field-help">El taller confirmará si es adecuado.</span>
          </div>
        </div>
        <button className="button-primary submit-button" type="submit" disabled={isSubmitting}>
          <span>{isSubmitting ? "Enviando solicitud…" : "Enviar para revisión"}</span><span className="button-arrow" aria-hidden="true">↗</span>
        </button>
        <p className="form-disclaimer">Esta prueba guarda los datos solo en la memoria de la API demo.</p>
      </form>
      {savedRequest && (
        <section className="success-panel" aria-live="polite" role="status">
          <span className="success-kicker">Solicitud registrada en demo</span>
          <h2>Ya está en revisión.</h2>
          <p>Referencia <strong>{savedRequest.id}</strong>. El estado quedó pendiente de cotización y no se asignó un precio.</p>
          <span className="status-chip">{savedRequest.status}</span>
        </section>
      )}
    </>
  );
}
