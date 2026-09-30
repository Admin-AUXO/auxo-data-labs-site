const FREE_DOMAINS = [
  "gmail.com","googlemail.com","outlook.com","hotmail.com","live.com","msn.com","yahoo.com","ymail.com",
  "icloud.com","me.com","mac.com","aol.com","proton.me","protonmail.com","gmx.com","gmx.net","mail.com",
  "zoho.com","zohomail.com","yandex.com","yandex.ru","rediffmail.com","qq.com","163.com","hey.com","fastmail.com",
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function checkWorkEmail(raw: string): string {
  const email = raw.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return "Enter a valid email address, like name@company.com.";
  if (FREE_DOMAINS.includes(email.split("@")[1])) return "Please use your company email. Personal addresses like Gmail or Outlook can't be used.";
  return "";
}
