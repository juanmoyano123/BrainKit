# Aplicar Migración 007: Study Sessions y Card Reviews

Esta migración crea las tablas necesarias para el sistema de estudio con repetición espaciada (SRS) - Feature F-007.

## Tablas a crear:
- `study_sessions` - Sesiones de estudio
- `card_reviews` - Revisiones individuales de tarjetas

## Pasos para aplicar la migración:

### Opción 1: Supabase Dashboard (Recomendado)

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Click en "SQL Editor" en el menú lateral
3. Click en "New Query"
4. Copia y pega el contenido completo del archivo `007_create_study_sessions_tables.sql`
5. Click en "Run" para ejecutar la migración

### Opción 2: Supabase CLI

```bash
# Desde la carpeta backend
supabase db push --file alembic/versions/007_create_study_sessions_tables.sql
```

### Opción 3: psql (si tienes acceso directo)

```bash
psql -h <your-supabase-host> -U postgres -d postgres -f alembic/versions/007_create_study_sessions_tables.sql
```

## Verificación

Después de aplicar la migración, verifica que las tablas existan:

```sql
-- En Supabase SQL Editor
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('study_sessions', 'card_reviews');
```

Deberías ver ambas tablas listadas.

## Rollback (si es necesario)

Si necesitas revertir la migración, ejecuta las instrucciones de rollback al final del archivo `007_create_study_sessions_tables.sql`.
