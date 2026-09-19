import Image from "next/image";
import { cx } from "./cx";

interface Avatar {
  src: string;
  alt: string;
}

interface AvatarStackProps {
  avatars: Avatar[];
  /** Quantidade de avatares visíveis antes de agrupar em "+N". */
  max?: number;
  className?: string;
}

/** Prova social — avatares sobrepostos, equivalente ao badge flutuante da referência. */
export function AvatarStack({ avatars, max = 3, className }: AvatarStackProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - visible.length;

  return (
    <div
      aria-label={`Pedido por ${avatars.length} clientes`}
      className={cx("flex items-center -space-x-2", className)}
    >
      {visible.map((avatar) => (
        <span
          key={avatar.src}
          className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-crema"
        >
          <Image src={avatar.src} alt={avatar.alt} fill sizes="36px" className="object-cover" />
        </span>
      ))}
      {overflow > 0 ? (
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-crema bg-espresso-100 font-body text-xs font-semibold text-espresso-800">
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}
