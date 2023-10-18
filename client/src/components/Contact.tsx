import { useEffect, useState } from "react";
import { baseUrl } from "../constants/constanst";
import { Link } from "react-router-dom";

export default function Contact({ listing }: any) {
  const [lanlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/user/${listing.userRef}`, {
          credentials: "include",
        });
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const onchange = (e: any) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {lanlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact<span className="font-semibold">{lanlord["username"]}</span>
            for{" "}
            <span className="font-semibold">
              {listing["name"].toLowerCase()}
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows={2}
            value={message}
            onChange={onchange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>
          <Link
            to={`mailto:${lanlord["email"]}?subject=Regarding ${listing["name"]}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity:95"
          >
            {" "}
            Send Message
          </Link>
        </div>
      )}
      |
    </>
  );
}
