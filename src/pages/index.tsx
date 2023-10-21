import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, Text } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <h1>Hello World</h1>
      <Button>Click me</Button>
    </main>
  );
}
