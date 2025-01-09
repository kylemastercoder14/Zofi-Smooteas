import { redirect } from "next/navigation";
const Home = async () => {
  return redirect("/sign-in");
};

export default Home;
