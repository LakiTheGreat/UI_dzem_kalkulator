## For migrations - if prisma doesn't load

$env:DATABASE_URL='postgresql://postgres.rzxchrvirqbtbkqqnsui:k2%262Y%24HBJk.e%25QL@aws-0-eu-central-2.pooler.supabase.com:5432/postgres'
npx prisma migrate dev --name ADD_NAME_HERE
