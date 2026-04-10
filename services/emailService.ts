import { TrainingRequest } from '../types';

/**
 * EMAILJS DASHBOARD CONFIGURATION:
 * -------------------------------
 * Update your template to include these exact tags:
 * 
 * - {{user_gender}}: The gender of the trainee
 * - {{trainer_gender_pref}}: Preferred gender of the coach
 * - {{available_days}}: List of days selected
 * - {{preferred_time}}: List of time slots selected
 * - {{sports}}: Selected sports
 * - {{equipment}}: Selected equipment
 * - {{schedule}}: Combined Day and Time
 * - {{user_email}}: User's email address
 * - {{user_phone}}: User's phone number
 */

const TEMPLATE_ID = 'template_trainer_match';
const PUBLIC_KEY = '7pO3mewojOMHG2J_d';
const SERVICE_ID = 'default_service';
const ADMIN_EMAIL = 'waytown90@gmail.com';

export const sendSubmissionEmail = async (request: TrainingRequest) => {
  const scheduleString = request.schedule.map(s => `${s.day} @ ${s.time}`).join(', ');
  const daysList = [...new Set(request.schedule.map(s => s.day))].join(', ');
  const timesList = [...new Set(request.schedule.map(s => s.time))].join(', ');
  const totalInvestment = request.perSessionBudget * request.sessionsPerMonth;
  
  const fullSummary = `
🔥 NEW TRAINER MATCH REQUEST
----------------------------
USER: ${request.userEmail}
PHONE: ${request.userPhone || 'N/A'}
TRAINEE GENDER: ${request.userGender || 'N/A'}
DATE OF BIRTH: ${request.dateOfBirth || 'N/A'}
TRAINER PREF: ${request.trainerGenderPreference || 'No Preference'}

MATCH PREFERENCES:
Sports: ${request.sports.join(', ')}
Available Days: ${daysList}
Preferred Times: ${timesList}
Combined Schedule: ${scheduleString}
Budget: ₹${request.perSessionBudget} per session
Frequency: ${request.sessionsPerMonth} sessions/mo
Total Monthly: ₹${totalInvestment}
Equipment: ${request.equipment.join(', ') || 'None'}
  `.trim();

  const templateParams = {
    to_email: ADMIN_EMAIL,
    from_name: 'TrainerBuddy System',
    user_email: request.userEmail,
    user_phone: request.userPhone || 'Not provided',
    user_gender: request.userGender || 'Not provided',
    date_of_birth: request.dateOfBirth || 'Not provided',
    trainer_gender_pref: request.trainerGenderPreference || 'No Preference',
    sports: request.sports.join(', '),
    equipment: request.equipment.join(', ') || 'None',
    available_days: daysList,
    preferred_time: timesList,
    schedule: scheduleString, 
    sessions_per_month: request.sessionsPerMonth,
    per_session_budget: `₹${request.perSessionBudget}`,
    total_monthly: `₹${totalInvestment}`,
    message: fullSummary,
    submission_id: request.id
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: templateParams,
      }),
    });

    if (response.ok) {
      console.log("%c[EMAIL SUCCESS] Full profile report sent to " + ADMIN_EMAIL, "color: green; font-weight: bold;");
      return true;
    }
    return false;
  } catch (error) {
    console.error("[EMAIL ERROR] Failed to send report:", error);
    return false;
  }
};

export const sendSignUpEmail = async () => {};
export const sendLogInEmail = async () => {};
export const sendBuildCompletionEmail = async () => {};