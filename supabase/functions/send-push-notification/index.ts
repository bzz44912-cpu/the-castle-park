// @ts-nocheck
// This file runs on Supabase Edge Functions (Deno runtime), not locally.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { JWT } from 'https://esm.sh/google-auth-library@9'

const FIREBASE_SERVICE_ACCOUNT = JSON.parse(Deno.env.get('FIREBASE_SERVICE_ACCOUNT') || '{}')

serve(async (req: Request) => {
  try {
    const payload = await req.json()
    const { record, old_record } = payload || {}

    // Déclencher quand la commande passe de 'pending' à 'preparing'
    if (record && old_record && record.status === 'preparing' && old_record.status === 'pending') {
      const fcmToken = record.fcm_token 
      if (!fcmToken) {
        console.log('Aucun token FCM trouvé pour cette commande.')
        return new Response('No token found', { status: 200 })
      }
      
      console.log(`Envoi de notification à ${record.customer_name} (Token: ${fcmToken.substring(0, 10)}...)`)

      // Obtenir le token d'accès Google
      const jwt = new JWT({
        email: FIREBASE_SERVICE_ACCOUNT.client_email,
        key: FIREBASE_SERVICE_ACCOUNT.private_key,
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      })
      const accessToken = await jwt.getAccessToken()

      // Envoyer la notification FCM
      const fcmResponse = await fetch(
        `https://fcm.googleapis.com/v1/projects/${FIREBASE_SERVICE_ACCOUNT.project_id}/messages:send`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.token}`,
          },
          body: JSON.stringify({
            message: {
              token: fcmToken,
              notification: {
                title: 'Commande Acceptée ! 🏰',
                body: `Bonjour ${record.customer_name}, votre commande est en cours de préparation au Castle Park.`,
              },
              data: {
                orderId: record.id,
                status: 'preparing',
              },
            },
          }),
        }
      )

      const result = await fcmResponse.json()
      console.log('FCM Result:', result)
    }

    return new Response(JSON.stringify({ message: 'Process completed' }), { status: 200 })
  } catch (err: any) {
    console.error('Error in Edge Function:', err.message)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})
