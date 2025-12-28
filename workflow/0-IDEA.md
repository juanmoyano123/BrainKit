BRIEF ESTRATÉGICO
📌 LA IDEA
BrainKit es una plataforma web que te ayuda a memorizar cualquier lista en 24 horas.
El usuario pega una lista (puede ser lo que sea: capital de países, pasos de un procedimiento médico, vocabulario en otro idioma, nombres de presidentes).
El sistema genera 3 formas creativas de memorizar esa lista (acróstica, historia, patrón visual).
El usuario elige cuál le gusta más.
Luego, el sistema automáticamente genera ~15-20 preguntas y respuestas sobre esa mnemotecnia.
El usuario estudia esas tarjetas con un sistema inteligente que repite lo que olvidó, pero no te hace perder tiempo en lo que ya sabes.

🎯 QUIÉN LO USA

Estudiantes de medicina, derecho, ingeniería
Gente estudiando para certificaciones (MCAT, Bar, GRE)
Profesionales memorizando procedimientos
Cualquiera que necesite memorizar listas


💡 POR QUÉ ES DIFERENTE
Existen apps de flashcards (Anki, Quizlet). Existen generadores de ideas. Pero nadie integra ambas cosas automáticamente.
Con BrainKit:

No tienes que pensar cómo memorizar
No tienes que crear manualmente las tarjetas
Memorizas más rápido porque combina dos técnicas


💰 CÓMO GANA DINERO
Free: 3 generaciones por mes
Premium ($9.99/mes): Ilimitadas + seguimiento de progreso + estadísticas

🏗️ ESTRUCTURA GENERAL
Flujo del usuario:

Registrarse
Crear un "Deck" (colección de estudio)
Pegar una lista
Generar mnemotecnias (Claude API)
Elegir una
Generar flashcards automáticas (Claude API)
Estudiar
Ver progreso

Lo que necesitamos:

Frontend (React): Interfaz bonita para hacer todo esto
Backend (Python): Procesar listas, conectar con IA, guardar datos
Base de datos: Guardar usuarios, decks, tarjetas, progreso
IA: Claude para generar mnemotecnias y flashcards, Gemini para OCR después (V2)
Auth: Email/password y Google login
Hosting: Vercel para frontend, Railway para backend

