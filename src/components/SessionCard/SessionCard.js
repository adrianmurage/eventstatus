import {
  LinkedInLogoIcon,
  SizeIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { useRef } from "react";
import { getTime } from "../../utils";
import StatusPill from "../StatusPill/StatusPill";

function SessionCard({
  startTime,
  endTime,
  name,
  speakerName,
  speakerLinkedin,
  speakerTitle,
  speakerTwitter,
  resourceLink,
  venue,
}) {
  const btnRef = useRef(null);
  const cardRef = useRef(null);
  const handleHover = () => {
    btnRef.current.style.color = "rgb(100 116 139)";
  };

  const handleLeave = () => {
    btnRef.current.style.color = "rgb(71 85 105)";
  };

  return (
    <>
      <div
        className="relative collapse mb-2 border border-slate-600"
        onMouseOver={handleHover}
        onMouseLeave={handleLeave}
        onTouchStart={handleHover}
        onTouchEnd={handleLeave}
        ref={cardRef}
      >
        <input type="checkbox" />

        <div className="collapse-title text-lg font-normal">
          <small className="tracking-wide ">
            {getTime(startTime)} - {getTime(endTime)}
          </small>
          <h1 className=" ">{name}</h1>
          <div className=" mb-4 flex   tracking-wide">{venue}</div>

          <StatusPill endTime={startTime} startTime={endTime} />
        </div>

        <div className="collapse-content">
          <section className="mt-6 ">
            <h1 className=" tracking-wide  mb-1 text-slate-500">Speaker</h1>
            <div className="mb-2  ">{speakerName}</div>
            <div className="  mb-2 ">{speakerTitle}</div>
            <div className="flex align-middle">
              {speakerLinkedin && (
                <a href={speakerLinkedin}>
                  <LinkedInLogoIcon
                    className="mr-2  hover:hover:text-slate-500"
                    width={20}
                    height={20}
                  />
                </a>
              )}
              {speakerTwitter && (
                <a href={speakerTwitter}>
                  <TwitterLogoIcon
                    className=" hover:text-slate-500"
                    width={20}
                    height={20}
                  />
                </a>
              )}
            </div>
          </section>

          {resourceLink && (
            <section className="mt-4">
              <h1 className=" tracking-wide mb-1 text-slate-500">Resources</h1>
              <a
                href={resourceLink}
                className=" underline text-sm underline-offset-2"
              >
                Link to slides
              </a>
            </section>
          )}
        </div>
        <button className="absolute right-2 top-2">
          <SizeIcon
            className="text-slate-400"
            ref={btnRef}
            width={20}
            height={20}
          />
        </button>
      </div>
    </>
  );
}

export default SessionCard;
