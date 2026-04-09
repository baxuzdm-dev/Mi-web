import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad — Mundo Creadores",
  description:
    "Conoce cómo Mundo Creadores recopila, usa y protege tu información personal de acuerdo con el RGPD y la legislación aplicable.",
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

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Documento Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Política de Privacidad
          </h1>
          <p className="text-white/50 text-sm">
            Fecha de entrada en vigor:{" "}
            <span className="text-white/70">1 de enero de 2025</span>
            {" · "}
            Última actualización:{" "}
            <span className="text-white/70">1 de enero de 2025</span>
          </p>
          <p className="mt-6 text-white/60 leading-relaxed max-w-2xl">
            En <span className="text-white font-medium">Mundo Creadores</span>{" "}
            (en adelante &quot;nosotros&quot;, &quot;nos&quot; o
            &quot;nuestro&quot;) nos comprometemos a proteger y respetar tu
            privacidad. Esta política describe cómo recopilamos, usamos y
            protegemos tu información personal cuando utilizas nuestra
            plataforma en{" "}
            <span className="text-violet-400">mundocreadores.com</span>.
          </p>
        </div>

        {/* Sections */}
        <Section title="1. Información que recopilamos">
          <p>
            Recopilamos distintos tipos de información con el fin de prestarte
            nuestros servicios de manera óptima y segura.
          </p>

          <SubSection title="1.1 Datos de cuenta">
            <p>
              Cuando te registras en Mundo Creadores, recopilamos la siguiente
              información:
            </p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 text-white/60">
              <li>Nombre completo o nombre artístico</li>
              <li>Dirección de correo electrónico</li>
              <li>Contraseña (almacenada con hash criptográfico)</li>
              <li>Tipo de cuenta (creador o agencia)</li>
              <li>
                Información de perfil: foto, biografía, redes sociales,
                estadísticas públicas
              </li>
              <li>País y zona horaria</li>
            </ul>
          </SubSection>

          <SubSection title="1.2 Datos de uso">
            <p>
              Recogemos automáticamente ciertos datos cuando interactúas con
              nuestra plataforma:
            </p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 text-white/60">
              <li>
                Dirección IP y datos de geolocalización aproximada (país /
                ciudad)
              </li>
              <li>Tipo de dispositivo, sistema operativo y navegador</li>
              <li>Páginas visitadas, tiempo de sesión y clics</li>
              <li>Registros de actividad (búsquedas, mensajes enviados)</li>
              <li>Datos de referencia (cómo llegaste a nuestra plataforma)</li>
            </ul>
          </SubSection>

          <SubSection title="1.3 Cookies y tecnologías similares">
            <p>
              Utilizamos cookies propias y de terceros, balizas web y tecnologías
              de seguimiento similares. Consulta la sección 7 para más detalle.
            </p>
          </SubSection>
        </Section>

        <Section title="2. Cómo usamos tu información">
          <p>Utilizamos la información recopilada para los siguientes fines:</p>
          <ul className="list-disc list-inside space-y-2 mt-3 text-white/60">
            <li>
              <span className="text-white/80 font-medium">
                Prestación del servicio:
              </span>{" "}
              crear y gestionar tu cuenta, facilitar conexiones entre creadores y
              agencias, y procesar transacciones.
            </li>
            <li>
              <span className="text-white/80 font-medium">Comunicaciones:</span>{" "}
              enviarte notificaciones del sistema, actualizaciones del servicio y,
              con tu consentimiento, comunicaciones de marketing.
            </li>
            <li>
              <span className="text-white/80 font-medium">
                Mejora de la plataforma:
              </span>{" "}
              analizar patrones de uso para mejorar funcionalidades, detectar
              errores y optimizar la experiencia del usuario.
            </li>
            <li>
              <span className="text-white/80 font-medium">Seguridad:</span>{" "}
              detectar y prevenir fraudes, abusos y actividades ilegales que
              puedan afectar a nuestra comunidad.
            </li>
            <li>
              <span className="text-white/80 font-medium">
                Cumplimiento legal:
              </span>{" "}
              cumplir con obligaciones legales aplicables y responder a
              solicitudes de autoridades competentes cuando así lo exija la ley.
            </li>
            <li>
              <span className="text-white/80 font-medium">
                Personalización:
              </span>{" "}
              mostrarte contenido relevante, recomendaciones y resultados de
              búsqueda adaptados a tu perfil e intereses.
            </li>
          </ul>

          <p className="mt-4">
            La base legal para el tratamiento es, según el caso: la ejecución del
            contrato (Art. 6.1.b RGPD), el cumplimiento de obligaciones legales
            (Art. 6.1.c RGPD), nuestro interés legítimo (Art. 6.1.f RGPD) y, en
            su caso, tu consentimiento expreso (Art. 6.1.a RGPD).
          </p>
        </Section>

        <Section title="3. Compartir información">
          <p>
            No vendemos ni alquilamos tu información personal a terceros. Podemos
            compartir datos en las siguientes circunstancias:
          </p>

          <SubSection title="3.1 Con otros usuarios de la plataforma">
            <p>
              La información de tu perfil público (nombre, foto, descripción,
              métricas) es visible para otros usuarios registrados de Mundo
              Creadores. Puedes controlar qué información aparece en tu perfil
              desde los ajustes de privacidad.
            </p>
          </SubSection>

          <SubSection title="3.2 Con proveedores de servicios">
            <p>
              Trabajamos con proveedores externos de confianza que nos ayudan a
              operar la plataforma: procesadores de pago, servicios de correo,
              proveedores de infraestructura en la nube y herramientas de
              análisis. Estos proveedores acceden a tus datos únicamente para
              prestar servicios en nuestro nombre y bajo instrucciones
              contractuales estrictas.
            </p>
          </SubSection>

          <SubSection title="3.3 Por obligación legal">
            <p>
              Podemos divulgar tu información cuando sea requerido por ley, orden
              judicial o autoridad gubernamental competente, o cuando sea necesario
              para proteger los derechos, la propiedad o la seguridad de Mundo
              Creadores, nuestros usuarios o el público.
            </p>
          </SubSection>

          <SubSection title="3.4 Transferencias internacionales">
            <p>
              Algunos de nuestros proveedores pueden estar ubicados fuera del
              Espacio Económico Europeo (EEE). En dichos casos, nos aseguramos de
              que las transferencias cuenten con garantías adecuadas conforme al
              RGPD (cláusulas contractuales tipo, decisiones de adecuación, etc.).
            </p>
          </SubSection>
        </Section>

        <Section title="4. Seguridad de datos">
          <p>
            Implementamos medidas técnicas y organizativas apropiadas para
            proteger tu información personal contra accesos no autorizados,
            pérdida, alteración o divulgación. Entre estas medidas se incluyen:
          </p>
          <ul className="list-disc list-inside space-y-1.5 mt-3 text-white/60">
            <li>
              Cifrado en tránsito mediante TLS 1.3 en todas las comunicaciones
            </li>
            <li>
              Cifrado en reposo para datos sensibles almacenados en nuestros
              servidores
            </li>
            <li>
              Contraseñas almacenadas mediante funciones de hash seguras (bcrypt)
            </li>
            <li>
              Autenticación de dos factores (2FA) disponible para todas las
              cuentas
            </li>
            <li>Auditorías de seguridad y pruebas de penetración periódicas</li>
            <li>Acceso restringido a datos personales por parte de empleados</li>
          </ul>
          <p className="mt-4">
            Aunque nos esforzamos por proteger tu información, ningún sistema de
            transmisión de datos por Internet es 100 % seguro. Si detectas
            cualquier vulnerabilidad, te rogamos que nos la comuniques a{" "}
            <a
              href="mailto:security@mundocreadores.com"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              security@mundocreadores.com
            </a>
            .
          </p>
        </Section>

        <Section title="5. Tus derechos (RGPD)">
          <p>
            Si eres residente del Espacio Económico Europeo o del Reino Unido,
            tienes los siguientes derechos en relación con tus datos personales:
          </p>

          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {[
              {
                right: "Derecho de acceso",
                desc: "Solicitar una copia de los datos personales que tenemos sobre ti.",
              },
              {
                right: "Derecho de rectificación",
                desc: "Corregir datos inexactos o incompletos.",
              },
              {
                right: "Derecho de supresión",
                desc: 'Solicitar la eliminación de tus datos ("derecho al olvido").',
              },
              {
                right: "Derecho de limitación",
                desc: "Restringir el tratamiento de tus datos en determinadas circunstancias.",
              },
              {
                right: "Derecho a la portabilidad",
                desc: "Recibir tus datos en un formato estructurado y legible por máquina.",
              },
              {
                right: "Derecho de oposición",
                desc: "Oponerte al tratamiento basado en interés legítimo o con fines de marketing.",
              },
              {
                right: "Derecho a retirar el consentimiento",
                desc: "Retirar tu consentimiento en cualquier momento sin afectar la licitud del tratamiento previo.",
              },
              {
                right: "Derecho a reclamar",
                desc: "Presentar una reclamación ante la autoridad de control competente (AEPD en España).",
              },
            ].map(({ right, desc }) => (
              <div
                key={right}
                className="p-4 rounded-xl border border-white/10 bg-white/5"
              >
                <p className="font-medium text-white/90 text-sm mb-1">{right}</p>
                <p className="text-white/50 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-6">
            Para ejercer cualquiera de estos derechos, escríbenos a{" "}
            <a
              href="mailto:privacy@mundocreadores.com"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              privacy@mundocreadores.com
            </a>
            . Responderemos en el plazo máximo de 30 días.
          </p>
        </Section>

        <Section title="6. Retención de datos">
          <p>
            Conservamos tus datos personales durante el tiempo que tu cuenta esté
            activa o sea necesario para prestarte nuestros servicios. Cuando
            elimines tu cuenta, procederemos a eliminar o anonimizar tus datos
            salvo que estemos obligados a conservarlos por ley (por ejemplo, por
            obligaciones fiscales o contables durante el período legalmente
            exigido).
          </p>
          <p>
            Los datos de uso agregados y anonimizados pueden conservarse de forma
            indefinida con fines estadísticos y de mejora del servicio.
          </p>
        </Section>

        <Section title="7. Cookies">
          <p>
            Mundo Creadores utiliza cookies y tecnologías similares. Puedes
            gestionar tus preferencias en el banner de cookies que aparece al
            acceder a la plataforma por primera vez.
          </p>

          <div className="mt-4 space-y-3">
            {[
              {
                type: "Cookies esenciales",
                color: "violet",
                desc: "Necesarias para el funcionamiento básico de la plataforma (sesión de usuario, autenticación, seguridad). No pueden desactivarse.",
              },
              {
                type: "Cookies analíticas",
                color: "pink",
                desc: "Nos permiten entender cómo se usa la plataforma (páginas visitadas, tiempo de sesión). Utilizamos herramientas como Plausible Analytics con anonimización de IP.",
              },
              {
                type: "Cookies de preferencias",
                color: "violet",
                desc: "Recuerdan tus ajustes de idioma, tema y otras preferencias para mejorar tu experiencia.",
              },
            ].map(({ type, desc }) => (
              <div
                key={type}
                className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/5"
              >
                <div className="w-2 shrink-0 rounded-full bg-gradient-to-b from-violet-500 to-pink-500 mt-1" />
                <div>
                  <p className="font-medium text-white/90 text-sm mb-1">{type}</p>
                  <p className="text-white/50 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="8. Cambios en esta política">
          <p>
            Podemos actualizar esta Política de Privacidad periódicamente para
            reflejar cambios en nuestras prácticas o en la legislación aplicable.
            Cuando realicemos cambios materiales, te notificaremos mediante un
            aviso prominente en la plataforma o, si lo consideramos apropiado, por
            correo electrónico, con al menos 30 días de antelación antes de que
            entren en vigor.
          </p>
          <p>
            Te recomendamos que revises esta política periódicamente. El uso
            continuado de la plataforma tras la entrada en vigor de los cambios
            constituye tu aceptación de la política actualizada.
          </p>
        </Section>

        <Section title="9. Contacto">
          <p>
            Si tienes preguntas, dudas o solicitudes relacionadas con tu
            privacidad o esta política, puedes ponerte en contacto con nuestro
            Responsable de Protección de Datos:
          </p>
          <div className="mt-4 p-6 rounded-2xl border border-white/10 bg-white/5">
            <p className="font-semibold text-white mb-1">Mundo Creadores</p>
            <p className="text-white/60 text-sm">
              Responsable de Protección de Datos (DPO)
            </p>
            <a
              href="mailto:privacy@mundocreadores.com"
              className="inline-flex items-center gap-2 mt-3 text-violet-400 hover:text-violet-300 transition-colors font-medium"
            >
              privacy@mundocreadores.com
            </a>
          </div>
          <p className="mt-4">
            También tienes derecho a presentar una reclamación ante la Agencia
            Española de Protección de Datos (AEPD) en{" "}
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              www.aepd.es
            </a>
            .
          </p>
        </Section>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <Link
            href="/"
            className="hover:text-white transition-colors"
          >
            ← Volver al inicio
          </Link>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">
              Términos y Condiciones
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
