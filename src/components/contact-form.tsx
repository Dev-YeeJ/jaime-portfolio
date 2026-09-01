"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, CircleAlert, Send } from "lucide-react";
import clsx from "clsx";
import { site } from "@/lib/site";
import { Button } from "./ui";

type Field = "name" | "email" | "topic" | "message";
type Errors = Partial<Record<Field, string>>;

// Routing the enquiry by lane means the subject line already says what kind of
// work it is, before the message is even read.
const TOPICS = [
  { value: "Developer role or internship", label: "A developer role or internship" },
  { value: "Design work", label: "Design work" },
  { value: "Virtual assistant work", label: "Virtual assistant work" },
  { value: "Something else", label: "Something else" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "Add your name so I know who I'm replying to.";
  if (!values.email.trim()) errors.email = "I'll need an email address to reply to.";
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "That address doesn't look right — check for a typo.";
  if (!values.message.trim()) errors.message = "Tell me a bit about what you need.";

  return errors;
}

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground transition-colors duration-200 placeholder:text-muted/70 focus:border-accent focus:outline-none";

export function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    topic: TOPICS[0].value,
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (field: Field) => (event: { target: { value: string } }) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first thing that needs fixing.
      const first = (["name", "email", "message"] as Field[]).find((f) => found[f]);
      if (first) document.getElementById(first)?.focus();
      return;
    }

    // No backend: hand the message to the visitor's own mail client, prefilled.
    const subject = `${values.topic} — ${values.name.trim()}`;
    const body = [
      values.message.trim(),
      "",
      "—",
      values.name.trim(),
      values.email.trim(),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="card-surface rounded-xl p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={clsx(fieldClass, errors.name && "border-accent")}
          />
        </FormField>

        <FormField id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={set("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={clsx(fieldClass, errors.email && "border-accent")}
          />
        </FormField>
      </div>

      <div className="mt-5">
        <FormField id="topic" label="What's this about?">
          <div className="relative">
            <select
              id="topic"
              name="topic"
              value={values.topic}
              onChange={set("topic")}
              className={clsx(fieldClass, "appearance-none pr-11")}
            >
              {TOPICS.map((topic) => (
                <option key={topic.value} value={topic.value}>
                  {topic.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              strokeWidth={1.75}
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
            />
          </div>
        </FormField>
      </div>

      <div className="mt-5">
        <FormField id="message" label="Message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="What do you need, and by when?"
            value={values.message}
            onChange={set("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={clsx(fieldClass, "resize-y", errors.message && "border-accent")}
          />
        </FormField>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button type="submit">
          Send message
          <Send aria-hidden strokeWidth={1.75} className="size-3.5" />
        </Button>

        <p aria-live="polite" className="text-[13px] text-muted">
          {sent
            ? "Opening your email app — send the draft and it lands in my inbox."
            : "This opens your email app with the message ready to send."}
        </p>
      </div>
    </form>
  );
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-start gap-1.5 text-[12.5px] text-accent"
        >
          <CircleAlert aria-hidden strokeWidth={2} className="mt-px size-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
