import Image from "next/image";
import VoyagoLogo from "../../public/voyago-logo.svg";
import SearchForm from "./components/SearchForm";
import SearchTitle from "./components/SearchTitle";
import ProfileButton from "./components/ProfileButton";

export default async function Home() {
  const image =
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80";

  /* const options: SelectProps["options"] = [
    {
      label: "art",
      value: "art",
    },
    {
      label: "architecture",
      value: "architecture",
    },
    {
      label: "beaches",
      value: "beaches",
    },
    {
      label: "museums",
      value: "museums",
    },
    {
      label: "nature",
      value: "nature",
    },
    {
      label: "sports",
      value: "sports",
    },
  ]; */

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="absolute h-full w-full">
          <Image
            src={image}
            fill
            className="object-cover"
            alt="plane wing in the sky"
          />
        </div>

        <div className="fixed top-4 right-4">
          <ProfileButton />
        </div>

        <Image src={VoyagoLogo} alt="Voyago Logo" className="relative mb-8" />

        <div className="relative w-[600px] h-[600px]">
          <div className="absolute rounded-full w-full h-full bg-neutral-500 bg-opacity-10 backdrop-blur-md"></div>
          <div className="relative h-[600px] flex flex-col justify-center items-center z-10">
            <SearchTitle />

            <div className="mt-4">
              <SearchForm />
            </div>
          </div>
        </div>
        {/* {session && <UserCard user={session?.user} />} */}
      </div>
    </>
  );
}
