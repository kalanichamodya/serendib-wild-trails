export const site = {
  name: "Serendib Wild Trails",
  phone: "+94762801972",
  phoneLabel: "+94 76 280 1972",
  whatsapp: "94762801972",
};
export const whatsappUrl = (message: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
