import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ameer K — Junior FullStack Developer" },
      { name: "description", content: "Portfolio of Ameer K, Junior FullStack Developer specializing in React.js, Node.js, Express.js, and MySQL." },
      { property: "og:title", content: "Ameer K — Junior FullStack Developer" },
      { property: "og:description", content: "React · Node · MySQL — building scalable, user-focused web applications." },
    ],
  }),
  component: Portfolio,
});
