import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

export default function Listusers(props) {
  const [imageUrl, setImageUrl] = useState(null);

  async function fetchImageUrl(userName) {
    const storagePath = `avatar`;
    const { data, error } = await supabase.storage
      .from(storagePath)
      .getPublicUrl(userName + ".png");

    setImageUrl(data.publicUrl);
  }

  useEffect(() => {
    fetchImageUrl(props.props.email);
  }, [props]);

  return (
    <div>
      <div className="hover:bg-gradient-to-r from-[#22f2e4]/50 to-transparent hover:border-l-4 border-[#22f2e4] py-1 first:mt-4 flex flex-row">
        <img
          src={imageUrl} // Provide a placeholder image path
          alt={"avatar"}
          className="rounded-full w-8 h-8 "
        />
        <p className="ml-2 text-white">{props.props.name}</p>
      </div>
    </div>
  );
}
