import { Flex, Grid } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import Input from "../../components/Form/Input";
import { SelectCountry } from "../../components/Form/Select";
import Textarea from "../../components/Form/Textarea";
import Heading from "../../components/Typography/Heading";

type Step7Data = {
  address: string;
  countryId: string;
  facebook: string;
  instagram: string;
  linkedIn: string;
  tikTok: string;
  work: string;
  connect: string;
  support: string;
  otherNotes: string;
};

type Step7Props = Step7Data & {
  updateFields: (fields: Partial<Step7Data>) => void;
};

const Step7 = ({
  address,
  countryId,
  facebook,
  instagram,
  linkedIn,
  tikTok,
  work,
  connect,
  support,
  otherNotes,
  updateFields,
}: Step7Props) => {
  return (
    <Flex flexDirection="column" padding={8}>
      <Heading
        fontWeight={700}
        marginBottom={10}
        textAlign="center"
        variant="white"
      >
        Tell more about yourself
      </Heading>
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Flex flexDirection="column" width={["100%", "90%", "80%", "70%"]}>
          <Grid templateColumns="1fr 1fr" gap={4} marginBottom={4}>
            <Flex flexDirection="column" gap={4}>
              <FormItem
                htmlFor="company-admin-address"
                label="Address"
                isRequired
              >
                <Input
                  id="company-admin-address"
                  name="company-admin-address"
                  onChange={(e) => updateFields({ address: e.target.value })}
                  placeholder="Address"
                  type="text"
                  value={address}
                />
              </FormItem>
              <FormItem htmlFor="company-admin-facebook" label="Facebook">
                <Input
                  id="company-admin-facebook"
                  name="company-admin-facebook"
                  onChange={(e) => updateFields({ facebook: e.target.value })}
                  placeholder="Facebook"
                  type="text"
                  value={facebook}
                />
              </FormItem>
              <FormItem htmlFor="company-admin-linkedin" label="LinkedIn">
                <Input
                  id="company-admin-linkedin"
                  name="company-admin-linkedin"
                  onChange={(e) => updateFields({ linkedIn: e.target.value })}
                  placeholder="LinkedIn"
                  type="text"
                  value={linkedIn}
                />
              </FormItem>
            </Flex>
            <Flex flexDirection="column" gap={4}>
              <FormItem
                htmlFor="company-admin-country"
                label="Country"
                isRequired
              >
                <SelectCountry
                  id="company-admin-country"
                  name="company-admin-country"
                  onChange={(e) => updateFields({ countryId: e.target.value })}
                  value={countryId}
                />
              </FormItem>
              <FormItem htmlFor="company-admin-instagram" label="Instagram">
                <Input
                  id="company-admin-instagram"
                  name="company-admin-instagram"
                  onChange={(e) => updateFields({ instagram: e.target.value })}
                  placeholder="Instagram"
                  type="text"
                  value={instagram}
                />
              </FormItem>
              <FormItem htmlFor="company-admin-tiktok" label="TikTok">
                <Input
                  id="company-admin-tiktok"
                  name="company-admin-tiktok"
                  onChange={(e) => updateFields({ tikTok: e.target.value })}
                  placeholder="TikTok"
                  type="text"
                  value={tikTok}
                />
              </FormItem>
            </Flex>
          </Grid>
          <Flex flexDirection="column" gap={4}>
            <FormItem htmlFor="company-admin-work" label="How do you work?">
              <Textarea
                height="2rem"
                id="company-admin-work"
                name="company-admin-work"
                onChange={(e) => updateFields({ work: e.target.value })}
                placeholder="Type here..."
                value={work}
              />
            </FormItem>
            <FormItem
              htmlFor="company-admin-connect"
              label="How do you connect and learn?"
            >
              <Textarea
                height="2rem"
                id="company-admin-connect"
                name="company-admin-connect"
                onChange={(e) => updateFields({ connect: e.target.value })}
                placeholder="Type here..."
                value={connect}
              />
            </FormItem>
            <FormItem
              htmlFor="company-admin-support"
              label="What do you need support in?"
            >
              <Textarea
                height="2rem"
                id="company-admin-support"
                name="company-admin-support"
                onChange={(e) => updateFields({ support: e.target.value })}
                placeholder="Type here..."
                value={support}
              />
            </FormItem>
            <FormItem
              htmlFor="company-admin-notes"
              label="Other notes about yourself"
            >
              <Textarea
                height="2rem"
                id="company-admin-notes"
                name="company-admin-notes"
                onChange={(e) => updateFields({ otherNotes: e.target.value })}
                placeholder="Type here..."
                value={otherNotes}
              />
            </FormItem>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Step7;
