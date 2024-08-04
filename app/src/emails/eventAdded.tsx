import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";
import logo from "../../public/logo.jpg";

interface EventAddedEmailProps {
  username?: string | null | undefined;
  userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  inviteLink?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
  eventName?: string;
}

export const EventAddedEmail = ({
  username,
  userImage,
  invitedByUsername,
  invitedByEmail,
  teamName,
  teamImage,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
  eventName,
}: EventAddedEmailProps) => {
  const previewText = `Event ${eventName} is added to Event Base`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px flex justify-center">
              {/* <Img
                src={logo.src}
                width="40"
                height="37"
                alt="logo"
                className="my-0 mx-auto"
              /> */}
              <Logo />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              You are coordiantor of {eventName}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {username},{" "}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <p>
                You have been appointed as the Coordinator for the upcoming{" "}
                {eventName}. Your role will be crucial in ensuring the smooth
                execution and success of the event.
              </p>
            </Text>
            <Text>
              <p>As the Coordinator, your responsibilities will include:</p>
              <ul>
                <li>Overseeing the event setup and logistics.</li>
                <li>Coordinating with team members and volunteers.</li>
                <li>Ensuring all activities are executed as planned.</li>
                <li>Handling any issues that may arise during the event.</li>
                <li>Providing a detailed report post-event.</li>
              </ul>
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={inviteLink}
              >
                See the event
              </Button>
            </Section>

            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser to see further
              details:{" "}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EventAddedEmail;

function Logo(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      zoomAndPan="magnify"
      viewBox="0 0 375 374.999991"
      height="50"
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
    >
      <defs>
        <g />
      </defs>
      <rect
        x="-37.5"
        width="450"
        fill="#ffffff"
        y="-37.499999"
        height="449.999989"
        fill-opacity="1"
      />
      <rect
        x="-37.5"
        width="450"
        fill="#000000"
        y="-37.499999"
        height="449.999989"
        fill-opacity="1"
      />
      <g fill="#ffffff" fill-opacity="1">
        <g transform="translate(43.500002, 289.499981)">
          <g>
            <path d="M 45 -121.5 L 90.296875 -121.5 L 90.296875 -91.5 L 45 -91.5 L 45 -30 L 102 -30 L 102 0 L 12 0 L 12 -210 L 102 -210 L 102 -180 L 45 -180 Z M 45 -121.5 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fill-opacity="1">
        <g transform="translate(153.899786, 289.499981)">
          <g>
            <path d="M 61.796875 -210 C 78.992188 -210 91.441406 -206 99.140625 -198 C 106.847656 -190 110.703125 -177.898438 110.703125 -161.703125 L 110.703125 -154.203125 C 110.703125 -143.398438 109 -134.5 105.59375 -127.5 C 102.195312 -120.5 96.800781 -115.300781 89.40625 -111.90625 C 98.40625 -108.5 104.753906 -102.945312 108.453125 -95.25 C 112.148438 -87.550781 114 -78.101562 114 -66.90625 L 114 -49.796875 C 114 -33.597656 109.796875 -21.25 101.390625 -12.75 C 92.992188 -4.25 80.5 0 63.90625 0 L 12 0 L 12 -210 Z M 45 -94.5 L 45 -30 L 63.90625 -30 C 69.5 -30 73.742188 -31.5 76.640625 -34.5 C 79.546875 -37.5 81 -42.898438 81 -50.703125 L 81 -69 C 81 -78.800781 79.347656 -85.5 76.046875 -89.09375 C 72.742188 -92.695312 67.296875 -94.5 59.703125 -94.5 Z M 45 -180 L 45 -124.5 L 57.90625 -124.5 C 64.101562 -124.5 68.953125 -126.097656 72.453125 -129.296875 C 75.953125 -132.492188 77.703125 -138.296875 77.703125 -146.703125 L 77.703125 -158.40625 C 77.703125 -166 76.347656 -171.492188 73.640625 -174.890625 C 70.941406 -178.296875 66.695312 -180 60.90625 -180 Z M 45 -180 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fill-opacity="1">
        <g transform="translate(275.699602, 289.499981)">
          <g>
            <path d="M 43.796875 -31.796875 L 43.796875 0 L 12 0 L 12 -31.796875 Z M 43.796875 -31.796875 " />
          </g>
        </g>
      </g>
    </svg>
  );
}
