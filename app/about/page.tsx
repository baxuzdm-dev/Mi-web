import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nosotros — Mundo Creadores",
  description:
    "Conoce el equipo detrás de Mundo Creadores, nuestra misión de democratizar el management profesional para creadores de contenido hispanohablantes, y los valores que nos guían.",
  alternates: {
    canonical: "https://mundocreadores.com/about",
  },
  openGraph: {
    title: "Sobre Nosotros — Mundo Creadores",
    description:
      "Conoce el equipo detrás de Mundo Creadores y nuestra misión de democratizar el management profesional para creadores hispanohablantes.",
    type: "website",
    url: "https://mundocreadores.com/about",
  },
};

const team = [
  {
    name: "Alejandro Mendoza",
    role: "CEO & Co-founder",
    initials: "AM",
    gradientFrom: "from-violet-500",
    gradientTo: "to-pink-500",
    bio: "Ex-creador de YouTube con más de 2M de seguidores, Alejandro vivió en primera persona las dificultades de encontrar management de calidad. Esa frustración lo llevó a co-fundar Mundo Creadores en 2023 con la misión de que ningún creador tenga que navegar solo por la industria.",
    highlights: ["2M+ seguidores en YouTube", "10 años de experiencia", "Ex-Brand partnerships lead"],
  },
  {
    name: "Valentina Ruiz",
    role: "CTO & Co-founder",
    initials: "VR",
    gradientFrom: "from-pink-500",
    gradientTo: "to-orange-500",
    bio: "Valentina lideró equipos de ingeniería en una de las mayores plataformas de streaming de Latinoamérica. Su experiencia escalando productos a millones de usuarios da a Mundo Creadores la solidez técnica necesaria para crecer al ritmo que la industria exige.",
    highlights: ["Ex-Engineering Lead en streaming", "15 años en tech", "Especialista en sistemas escalables"],
  },
  {
    name: "Carlos Ibáñez",
    role: "Head of Partnerships",
    initials: "CI",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-violet-500",
    bio: "Con más de una década como agente de talento, Carlos ha negociado contratos para más de 200 creadores y conoce al dedillo lo que agencias y creadores necesitan el uno del otro. Es el puente humano que hace que las conexiones de la plataforma se conviertan en relaciones duraderas.",
    highlights: ["10+ años como agente de talento", "200+ creadores representados", "Experto en negociación de contratos"],
  },
];

const stats = [
  { value: "12,000+", label: "Creadores registrados", color: "text-violet-400" },
  { value: "340+", label: "Agencias verificadas", color: "text-pink-400" },
  { value: "8,500+", label: "Conexiones realizadas", color: "text-violet-400" },
  { value: "$42M+", label: "Generados para creadores", color: "text-emerald-400" },
];

const values = [
  {
    title: "Transparencia",
    icon: "◈",
    color: "border-violet-500/30 bg-violet-500/5",
    iconColor: "text-violet-400",
    desc: "Creemos que las relaciones sanas entre creadores y agencias solo son posibles con total claridad. Por eso exigimos transparencia en perfiles, métricas y condiciones de los acuerdos.",
  },
  {
    title: "Comunidad",
    icon: "◉",
    color: "border-pink-500/30 bg-pink-500/5",
    iconColor: "text-pink-400",
    desc: "No somos solo una herramienta, somos un ecosistema. Cada creador y cada agencia que se une refuerza una comunidad que se apoya mutuamente para crecer.",
  },
  {
    title: "Innovación",
    icon: "◆",
    color: "border-emerald-500/30 bg-emerald-500/5",
    iconColor: "text-emerald-400",
    desc: "La economía creadora evoluciona cada mes. Invertimos constantemente en nuevas funcionalidades, inteligencia de datos y herramientas que mantengan a nuestra comunidad un paso por delante.",
  },
  {
    title: "Confianza",
    icon: "◑",
    color: "border-orange-500/30 bg-orange-500/5",
    iconColor: "text-orange-400",
    desc: "Verificamos agencias, protegemos datos y mantenemos estándares rigurosos de calidad porque entendemos que la confianza es la base de cualquier relación profesional duradera.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-violet-600/8 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px]" />
      </div>

      {/* ─── Hero ─── */}
      <section className="relative pt-20 pb-28 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Nuestra historia
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-white">
            Conectando el{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              futuro del contenido
            </span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Nacimos de la frustración de un creador que no podía encontrar la
            agencia correcta y de la visión de que la economía creadora
            hispanohablante merecía su propia infraestructura profesional.
          </p>
        </div>
      </section>

      {/* ─── Mission & Vision ─── */}
      <section className="py-24 px-4 border-t border-white/8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="relative p-8 rounded-3xl border border-violet-500/20 bg-violet-500/5 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium mb-6">
                Nuestra misión
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                Democratizar el management profesional
              </h2>
              <p className="text-white/60 leading-relaxed text-lg">
                Democratizar el acceso al management profesional para creadores
                de contenido en todo el mundo hispanohablante, eliminando las
                barreras que históricamente han separado el talento emergente de
                las oportunidades de escala real.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="relative p-8 rounded-3xl border border-pink-500/20 bg-pink-500/5 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs font-medium mb-6">
                Nuestra visión
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                El estándar global de la economía creadora latina
              </h2>
              <p className="text-white/60 leading-relaxed text-lg">
                Ser la infraestructura de referencia donde cada creador
                hispanohablante, sin importar su tamaño o nicho, tenga acceso a
                las herramientas, los contactos y el soporte profesional
                necesario para construir un negocio sostenible y escalable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="py-20 px-4 bg-white/[0.02] border-t border-b border-white/8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#0a0a0f] p-8 text-center">
                <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-white/50 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section className="py-24 px-4 border-t border-white/8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-medium mb-4">
              El equipo
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Las personas detrás de la plataforma
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Construimos Mundo Creadores desde la experiencia real — como
              creadores, como ingenieros, como agentes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="group p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8 transition-all duration-300 flex flex-col"
              >
                {/* Avatar */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradientFrom} ${member.gradientTo} flex items-center justify-center text-white font-bold text-xl mb-6 shrink-0`}
                >
                  {member.initials}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-white/50 mb-4">{member.role}</p>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  {member.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs text-white/40">
                      <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="py-24 px-4 border-t border-white/8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-medium mb-4">
              Lo que nos guía
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Nuestros valores
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              No son palabras en una pared. Son los principios que usamos para
              tomar cada decisión de producto, de negocio y de equipo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className={`p-8 rounded-2xl border ${value.color} transition-all duration-200`}
              >
                <div className={`text-3xl mb-4 ${value.iconColor}`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/60 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Origin story ─── */}
      <section className="py-24 px-4 border-t border-white/8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-medium mb-4">
              El origen
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Por qué existe Mundo Creadores
            </h2>
          </div>
          <div className="space-y-6 text-white/60 leading-relaxed text-lg">
            <p>
              En 2022, Alejandro llevaba tres años como creador independiente y
              sabía que había llegado al techo de lo que podía hacer solo. Habló
              con docenas de agencias. Algunas no respondieron. Otras pedían
              contratos leoninos. La mayoría no entendía su nicho. El problema
              no era falta de agencias, era falta de infraestructura para
              conectarlas bien con el talento correcto.
            </p>
            <p>
              Junto a Valentina y Carlos, pasaron seis meses entrevistando a más
              de 150 creadores y 40 agencias en 12 países hispanohablantes. Lo
              que encontraron fue consistente: una industria que movía miles de
              millones de dólares pero que seguía operando con DMs de Instagram
              y hojas de cálculo.
            </p>
            <p>
              Mundo Creadores nació para cambiar eso. No como una red social más,
              sino como la infraestructura profesional que esta industria siempre
              necesitó: perfiles verificados, herramientas de comunicación
              estructurada y un sistema que permite que el talento correcto
              encuentre al equipo correcto en días, no en meses.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-4 border-t border-white/8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-pink-600/20 rounded-3xl blur-3xl" />
            <div className="relative p-12 rounded-3xl border border-white/10 bg-white/3">
              <h2 className="text-4xl font-bold text-white mb-4">
                Forma parte de la comunidad
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
                Únete a los más de 12,000 creadores y 340 agencias que ya están
                construyendo el futuro del contenido hispanohablante juntos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-violet-500/25"
                >
                  Crear cuenta gratis <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/explore/creators"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white/80 border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-200"
                >
                  Explorar creadores
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <div className="py-8 px-4 border-t border-white/8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <Link href="/" className="hover:text-white transition-colors">
            ← Volver al inicio
          </Link>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Términos
            </Link>
            <Link
              href="/explore/agencies"
              className="hover:text-white transition-colors"
            >
              Ver agencias
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
