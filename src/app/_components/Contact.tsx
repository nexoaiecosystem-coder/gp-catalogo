import { CONTACT } from "@/lib/constants";

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`;
const WA_URL = `https://wa.me/${CONTACT.whatsappNumber}`;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a7.5 7.5 0 0 0-7.5 7.5c0 5.4 6.5 11.7 6.8 12a1 1 0 0 0 1.4 0c.3-.3 6.8-6.6 6.8-12A7.5 7.5 0 0 0 12 2Zm0 10.3a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z" />
    </svg>
  );
}

const linkProps = { target: "_blank", rel: "noopener noreferrer" } as const;

/** WhatsApp, Instagram y dirección como links con su ícono (variant: chips grandes o línea chica). */
export function ContactLinks({ variant = "chips", withEmail = false }: { variant?: "chips" | "inline"; withEmail?: boolean }) {
  return (
    <div className={variant === "chips" ? "contact-chips" : "contact-inline"}>
      <a href={WA_URL} {...linkProps} aria-label={`WhatsApp ${CONTACT.whatsappDisplay}`}>
        <WhatsAppIcon />
        <span>{CONTACT.whatsappDisplay}</span>
      </a>
      <a href={CONTACT.instagramUrl} {...linkProps} aria-label={`Instagram ${CONTACT.instagramHandle}`}>
        <InstagramIcon />
        <span>{CONTACT.instagramHandle}</span>
      </a>
      <a href={MAPS_URL} {...linkProps} aria-label={`Ver ${CONTACT.address} en Google Maps`}>
        <PinIcon />
        <span>{CONTACT.address}</span>
      </a>
      {withEmail && (
        <a href={`mailto:${CONTACT.email}`}>
          <span>{CONTACT.email}</span>
        </a>
      )}
    </div>
  );
}
