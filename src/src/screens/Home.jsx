import { Button } from "@/components/ui/button"

function Home() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <Button className="bg-primary-900">Hello world!</Button>
      <Button>Hello world!</Button>
      <Button className="bg-secondary-300" variant="secondary">Hello world!</Button>
      <Button variant="secondary">Hello world!</Button>
      <Button variant="destructive">Hello world!</Button>
      <Button variant="outline">Hello world!</Button>
      <Button variant="ghost">Hello world!</Button>
      <Button variant="link">Hello world!</Button>
    </div>
  )
}

export default Home