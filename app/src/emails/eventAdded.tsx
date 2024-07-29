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
                        <Section className="mt-[32px]">
                            <Img src={``} width="40" height="37" alt="logo" className="my-0 mx-auto" />
                        </Section>
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            congratulations
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">Hello {username}, </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Your event {eventName} got added to Event Base
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
                            or copy and paste this URL into your browser to see further details:{" "}
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
