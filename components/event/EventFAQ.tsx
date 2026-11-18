import { faqs } from '@/data/event';

export default function EventFAQ() {
  return (
    <div className="faq-list">
      {faqs.map((faq, index) => (
        <details key={faq.question} className="faq-item" open={index === 0}>
          <summary className="faq-item__question">
            <span>{faq.question}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <p className="faq-item__answer">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
