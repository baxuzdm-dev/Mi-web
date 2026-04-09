import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones — Mundo Creadores",
  description:
    "Lee los términos y condiciones que rigen el uso de la plataforma Mundo Creadores. Conoce tus derechos y obligaciones como usuario.",
  alternates: {
    canonical: "https://mundocreadores.com/terms",
  },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-white mb-4 pb-3 border-b border-white/10">
        {title}
      </h2>
      <div className="space-y-4 text-white/70 leading-relaxed">{children}</div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-white/90 mb-2">{title}</h3>
      <div className="space-y-3 text-white/70 leading-relaxed">{children}</div>
    </div>
  );
}

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl border border-violet-500/20 bg-violet-500/5 text-white/70 text-sm leading-relaxed">
      {children}
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-pink-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            Documento Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Términos y Condiciones
          </h1>
          <p className="text-white/50 text-sm">
            Fecha de entrada en vigor:{" "}
            <span className="text-white/70">1 de enero de 2025</span>
            {" · "}
            Última actualización:{" "}
            <span className="text-white/70">1 de enero de 2025</span>
          </p>
          <p className="mt-6 text-white/60 leading-relaxed max-w-2xl">
            Bienvenido a{" "}
            <span className="text-white font-medium">Mundo Creadores</span>. Al
            acceder o utilizar nuestra plataforma en{" "}
            <span className="text-pink-400">mundocreadores.com</span>, aceptas
            quedar vinculado por estos Términos y Condiciones. Por favor, léelos
            detenidamente antes de usar el servicio.
          </p>
        </div>

        {/* Sections */}
        <Section title="1. Aceptación de términos">
          <p>
            Al registrarte, acceder o utilizar la plataforma Mundo Creadores,
            confirmas que has leído, comprendido y aceptas quedar legalmente
            vinculado por estos Términos y Condiciones, así como por nuestra{" "}
            <Link
              href="/privacy"
              className="text-pink-400 hover:text-pink-300 transition-colors"
            >
              Política de Privacidad
            </Link>
            , que se incorpora aquí por referencia.
          </p>
          <p>
            Si no estás de acuerdo con alguno de estos términos, no debes
            acceder ni utilizar la plataforma. El uso continuado de la
            plataforma tras la publicación de cambios en estos términos
            constituye tu aceptación de dichos cambios.
          </p>
          <InfoCard>
            Estos Términos constituyen un acuerdo legalmente vinculante entre
            tú (&quot;Usuario&quot;) y Mundo Creadores (&quot;Empresa&quot;,
            &quot;nosotros&quot;, &quot;nos&quot; o &quot;nuestro&quot;). Debes
            tener al menos 18 años para utilizar este servicio.
          </InfoCard>
        </Section>

        <Section title="2. Descripción del servicio">
          <p>
            Mundo Creadores es una plataforma de marketplace que facilita la
            conexión entre creadores de contenido digital y agencias de
            management y talento en el mundo hispanohablante. Nuestros servicios
            incluyen:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 text-white/60">
            <li>
              <span className="text-white/80 font-medium">
                Perfiles de creadores:
              </span>{" "}
              publicación y gestión de perfiles profesionales con métricas y
              portafolios.
            </li>
            <li>
              <span className="text-white/80 font-medium">
                Directorio de agencias:
              </span>{" "}
              acceso a un catálogo verificado de agencias de management y
              talento.
            </li>
            <li>
              <span className="text-white/80 font-medium">
                Sistema de mensajería:
              </span>{" "}
              herramientas de comunicación directa entre creadores y agencias.
            </li>
            <li>
              <span className="text-white/80 font-medium">
                Exploración y búsqueda:
              </span>{" "}
              funcionalidades avanzadas de filtrado y descubrimiento de talento
              y agencias.
            </li>
            <li>
              <span className="text-white/80 font-medium">
                Planes de suscripción:
              </span>{" "}
              acceso a funcionalidades premium mediante planes de pago.
            </li>
          </ul>
          <p>
            Nos reservamos el derecho de modificar, suspender o discontinuar
            cualquier aspecto del servicio en cualquier momento, con o sin
            previo aviso.
          </p>
        </Section>

        <Section title="3. Registro y cuentas">
          <SubSection title="3.1 Elegibilidad">
            <p>
              Para utilizar la plataforma debes ser mayor de 18 años y tener
              capacidad legal para celebrar contratos vinculantes. Si te
              registras en nombre de una empresa, confirmas que tienes autoridad
              para vincular a dicha entidad con estos términos.
            </p>
          </SubSection>

          <SubSection title="3.2 Información de cuenta">
            <p>
              Al crear una cuenta debes proporcionar información veraz, precisa,
              actualizada y completa. Eres responsable de mantener la
              confidencialidad de tus credenciales y de todas las actividades
              realizadas bajo tu cuenta. Debes notificarnos inmediatamente
              cualquier uso no autorizado de tu cuenta.
            </p>
          </SubSection>

          <SubSection title="3.3 Tipos de cuenta">
            <p>
              Ofrecemos dos tipos de cuenta: <strong className="text-white/90">Creador</strong> y{" "}
              <strong className="text-white/90">Agencia</strong>. Cada tipo tiene
              funcionalidades y responsabilidades específicas. No está permitido
              crear múltiples cuentas del mismo tipo para el mismo individuo o
              entidad.
            </p>
          </SubSection>

          <SubSection title="3.4 Verificación">
            <p>
              Mundo Creadores puede requerir la verificación de tu identidad o
              de las métricas de tu cuenta. Nos reservamos el derecho de
              rechazar, suspender o cancelar cuentas que no superen los procesos
              de verificación o que incumplan estos términos.
            </p>
          </SubSection>
        </Section>

        <Section title="4. Código de conducta">
          <p>
            Al utilizar la plataforma, aceptas no realizar ninguna de las
            siguientes acciones:
          </p>

          <div className="mt-4 space-y-3">
            {[
              {
                title: "Contenido ilegal o dañino",
                desc: "Publicar, transmitir o compartir contenido ilegal, difamatorio, obsceno, fraudulento, amenazante o que infrinja derechos de terceros.",
              },
              {
                title: "Suplantación de identidad",
                desc: "Hacerse pasar por otra persona, empresa o entidad, o proporcionar información falsa sobre tu identidad o afiliaciones.",
              },
              {
                title: "Spam y comunicaciones no solicitadas",
                desc: "Enviar mensajes masivos no solicitados, spam o cualquier forma de comunicación no autorizada a otros usuarios.",
              },
              {
                title: "Manipulación del sistema",
                desc: "Intentar eludir las medidas de seguridad, acceder a cuentas de otros usuarios, o manipular los sistemas de ranking o búsqueda.",
              },
              {
                title: "Recopilación de datos",
                desc: "Extraer, raspar o recopilar datos de otros usuarios de la plataforma sin autorización expresa.",
              },
              {
                title: "Actividades fuera de la plataforma",
                desc: "Intentar desviar transacciones o relaciones comerciales fuera de la plataforma para eludir los mecanismos de pago.",
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/5"
              >
                <div className="w-1.5 shrink-0 rounded-full bg-gradient-to-b from-pink-500 to-violet-500 my-1" />
                <div>
                  <p className="font-medium text-white/90 text-sm mb-1">
                    {title}
                  </p>
                  <p className="text-white/50 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4">
            El incumplimiento de este código puede resultar en la suspensión
            inmediata o cancelación permanente de tu cuenta, sin perjuicio de
            las acciones legales que pudieran corresponder.
          </p>
        </Section>

        <Section title="5. Propiedad intelectual">
          <SubSection title="5.1 Contenido de la plataforma">
            <p>
              Todo el contenido de Mundo Creadores — incluyendo diseño, código,
              textos, gráficos, logotipos, iconos y funcionalidades — es
              propiedad de Mundo Creadores o sus licenciantes y está protegido
              por las leyes de propiedad intelectual aplicables. Queda
              expresamente prohibida su reproducción, distribución o uso sin
              autorización previa y por escrito.
            </p>
          </SubSection>

          <SubSection title="5.2 Contenido del usuario">
            <p>
              Conservas todos los derechos de propiedad intelectual sobre el
              contenido que publiques en la plataforma. Al publicarlo, nos
              concedes una licencia mundial, no exclusiva, libre de regalías y
              sublicenciable para usar, reproducir, modificar, adaptar, publicar
              y mostrar dicho contenido únicamente con el fin de operar y
              mejorar la plataforma.
            </p>
          </SubSection>

          <SubSection title="5.3 Marcas registradas">
            <p>
              Los nombres &quot;Mundo Creadores&quot; y{" "}
              &quot;mundocreadores.com&quot;, junto con nuestros logotipos y
              marcas, son marcas registradas o en proceso de registro de nuestra
              empresa. No puedes utilizarlos sin nuestro consentimiento previo y
              por escrito.
            </p>
          </SubSection>
        </Section>

        <Section title="6. Pagos y suscripciones">
          <SubSection title="6.1 Planes de pago">
            <p>
              Ofrecemos planes de suscripción con diferentes niveles de acceso y
              funcionalidades. Los precios y condiciones de cada plan se detallan
              en la página de precios y pueden modificarse con previo aviso de 30
              días.
            </p>
          </SubSection>

          <SubSection title="6.2 Facturación y renovación">
            <p>
              Las suscripciones se facturan por adelantado de forma mensual o
              anual, según el plan elegido. Las suscripciones se renuevan
              automáticamente al final de cada periodo de facturación a menos
              que las canceles antes de la fecha de renovación.
            </p>
          </SubSection>

          <SubSection title="6.3 Política de reembolso">
            <p>
              Puedes cancelar tu suscripción en cualquier momento. Los planes
              mensuales no tienen derecho a reembolso prorrateado por el período
              no utilizado. Los planes anuales tienen derecho a reembolso
              prorrateado si se cancelan dentro de los primeros 14 días desde la
              compra o renovación.
            </p>
          </SubSection>

          <SubSection title="6.4 Impuestos">
            <p>
              Los precios mostrados no incluyen impuestos aplicables (IVA, etc.)
              salvo que se indique lo contrario. Los impuestos correspondientes
              se añadirán según la legislación fiscal aplicable en tu
              jurisdicción.
            </p>
          </SubSection>

          <InfoCard>
            Procesamos los pagos a través de proveedores de pago certificados y
            seguros. Mundo Creadores no almacena datos de tarjetas de crédito en
            sus servidores.
          </InfoCard>
        </Section>

        <Section title="7. Limitación de responsabilidad">
          <p>
            En la máxima medida permitida por la ley aplicable, Mundo Creadores
            no será responsable de:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 text-white/60">
            <li>
              Daños indirectos, incidentales, especiales, consecuentes o
              punitivos derivados del uso o imposibilidad de uso de la
              plataforma.
            </li>
            <li>
              Pérdida de beneficios, datos, reputación u otras pérdidas
              intangibles.
            </li>
            <li>
              Conductas de terceros en la plataforma, incluidos otros usuarios,
              creadores o agencias.
            </li>
            <li>
              Interrupciones del servicio, errores técnicos o pérdida de datos
              debidos a causas ajenas a nuestro control razonable.
            </li>
            <li>
              Accesos no autorizados a tu cuenta derivados de tu negligencia en
              la custodia de tus credenciales.
            </li>
          </ul>
          <p>
            La responsabilidad total de Mundo Creadores ante ti por cualquier
            reclamación derivada del uso de la plataforma no excederá el importe
            total que hayas pagado durante los 12 meses anteriores al hecho que
            origine la reclamación, o 100 €, el importe que sea mayor.
          </p>
          <p>
            La plataforma se proporciona &quot;tal cual&quot; y &quot;según
            disponibilidad&quot;, sin garantías de ningún tipo, ya sean
            expresas o implícitas, incluyendo, entre otras, las garantías de
            comerciabilidad, idoneidad para un fin particular o no infracción.
          </p>
        </Section>

        <Section title="8. Ley aplicable y jurisdicción">
          <p>
            Estos Términos y Condiciones se rigen e interpretan de acuerdo con
            la legislación española y la normativa de la Unión Europea aplicable,
            sin perjuicio de las normas imperativas del país de residencia del
            usuario consumidor que pudieran resultar más beneficiosas.
          </p>
          <p>
            Cualquier controversia derivada de o relacionada con estos Términos
            que no pueda resolverse amigablemente se someterá a la jurisdicción
            exclusiva de los tribunales de Madrid, España, salvo que la ley
            aplicable exija otra jurisdicción.
          </p>
          <p>
            Si eres un consumidor residente en la Unión Europea, también puedes
            acceder a la plataforma de resolución de litigios en línea (ODR) de
            la Comisión Europea en{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 transition-colors"
            >
              ec.europa.eu/consumers/odr
            </a>
            .
          </p>
        </Section>

        <Section title="9. Disposiciones generales">
          <SubSection title="9.1 Divisibilidad">
            <p>
              Si alguna disposición de estos Términos fuera declarada inválida o
              inaplicable, dicha disposición se modificará en la medida mínima
              necesaria para hacerla válida y aplicable, y las restantes
              disposiciones permanecerán en plena vigencia.
            </p>
          </SubSection>

          <SubSection title="9.2 Renuncia">
            <p>
              El hecho de que Mundo Creadores no ejerza o haga cumplir algún
              derecho o disposición de estos Términos no constituirá una renuncia
              a dicho derecho o disposición.
            </p>
          </SubSection>

          <SubSection title="9.3 Acuerdo completo">
            <p>
              Estos Términos, junto con la Política de Privacidad y cualquier
              otro acuerdo específico celebrado entre las partes, constituyen el
              acuerdo completo entre tú y Mundo Creadores en relación con el uso
              de la plataforma y sustituyen a cualquier acuerdo anterior.
            </p>
          </SubSection>
        </Section>

        <Section title="10. Contacto">
          <p>
            Si tienes preguntas sobre estos Términos y Condiciones o necesitas
            asistencia legal relacionada con tu cuenta, puedes contactarnos:
          </p>
          <div className="mt-4 p-6 rounded-2xl border border-white/10 bg-white/5">
            <p className="font-semibold text-white mb-1">Mundo Creadores</p>
            <p className="text-white/60 text-sm">Departamento Legal</p>
            <a
              href="mailto:legal@mundocreadores.com"
              className="inline-flex items-center gap-2 mt-3 text-pink-400 hover:text-pink-300 transition-colors font-medium"
            >
              legal@mundocreadores.com
            </a>
          </div>
          <p className="mt-4">
            Nos comprometemos a responder a todas las consultas en un plazo
            máximo de 5 días hábiles.
          </p>
        </Section>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <Link href="/" className="hover:text-white transition-colors">
            ← Volver al inicio
          </Link>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Sobre nosotros
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
