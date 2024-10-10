import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import axios from 'axios';

// Fonction pour envoyer un email avec Gmail
export async function sendEmailWithGmail(token: string, fromEmail: string, toEmail: string) {

    const emailContent = `
        From: Innoesate <${fromEmail}>
        To: Math <${toEmail}>
        Subject: Bonjour
        Content-Type: text/plain; charset="UTF-8"

        Bonjour, ce message est envoyé depuis mon application AWS Amplify Gen2 !
    `;

    // Encode l'email en base64url
    const base64EncodedEmail = btoa(unescape(encodeURIComponent(emailContent)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    try {
        // Envoyer l'email via l'API Gmail
        const response = await axios.post(
            'https://www.googleapis.com/gmail/v1/users/me/messages/send',
            {
                raw: base64EncodedEmail, // Le corps de l'email encodé
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Jeton OAuth pour Gmail
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Email envoyé avec succès :', response.data);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
    }
}

export function fetchGoogleAccessToken(): string | null {
  // Loop through all the keys in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    // Check if the key contains both "google" and "accessToken"
    if (key && key.includes("google") && key.includes("accessToken")) {
      // Return the value associated with the key
      return localStorage.getItem(key);
    }
  }

  // If no matching key is found, return null
  return null;
}

Amplify.configure(outputs);

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.less',
})
export class DesktopComponent implements OnInit{

  constructor(public authenticator: AuthenticatorService) {
    // console.log('DesktopComponent.constructor()', authenticator);
    Amplify.configure(outputs);
  }

  ngOnInit() {

    // Si l'état change, vous pouvez l'écouter comme suit :
    this.authenticator.subscribe(currentSession => {
      console.log('currentSession', currentSession);
    });
    console.log(this.authenticator);
    console.log(this.authenticator.user);
  }


}
