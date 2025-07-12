import Icon from '@/components/ui/Icon';

interface ContactCard {
  icon: string;
  title: string;
  description: string;
  action: string;
}

interface ContactCardsProps {
  contactCards: ContactCard[];
}

export default function ContactCards({ contactCards }: ContactCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {contactCards.map((card, idx) => (
        <a
          key={idx}
          href={card.action}
          className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-300 text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-lg mb-4 group-hover:bg-green-100 transition-colors">
            <Icon name={card.icon} size="md" className="text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
          <p className="text-gray-600">{card.description}</p>
        </a>
      ))}
    </div>
  );
} 