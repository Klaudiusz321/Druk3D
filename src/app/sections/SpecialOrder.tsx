import React from "react";

const SpecialOrder = () => {
  return (
    <div className="min-h-min bg-background flex flex-col items-center justify-center p-8">
      {/* Nagłówek */}
      <h1 className="text-4xl font-bold text-foreground mb-4 text-center">
        Masz szczególne zamówienie?
      </h1>
      {/* Podtytuł */}
      <p className="text-xl text-foreground mb-8 text-center">
        Skontaktuj się z nami!
      </p>
      {/* Przycisk – przykładowy odsyłacz */}
      <a
        href="mailto:kontakt@example.com"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Napisz do nas
      </a>
    </div>
  );
};

export default SpecialOrder;
