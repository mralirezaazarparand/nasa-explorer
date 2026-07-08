"use client";

function useScrollTo() {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return { scrollTo };
}

export { useScrollTo };
