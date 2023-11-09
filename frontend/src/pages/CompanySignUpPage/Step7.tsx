// lib
import { Flex, Grid, Heading, Input, Textarea } from "@chakra-ui/react";

// local
import { FormItem } from "../../components/Form/FormItem";
import { SelectCountry } from "../../components/Form/Select";

type Step7Data = {
  Address: string;
  CountryId: string;
  Facebook: string;
  Instagram: string;
  Linkedin: string;
  TikTok: string;
  Work: string;
  Connect: string;
  Support: string;
  Other_Notes: string;
};

type Step7Props = Step7Data & {
  updateFields: (fields: Partial<Step7Data>) => void;
};

export const Step7 = ({
  Address,
  CountryId,
  Facebook,
  Instagram,
  Linkedin,
  TikTok,
  Work,
  Connect,
  Support,
  Other_Notes,
  updateFields,
}: Step7Props) => {
  return (
    <Flex flexDirection="column" padding={8}>
      <Heading marginBottom={10} textAlign="center">
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
                  onChange={(e) => updateFields({ Address: e.target.value })}
                  placeholder="Address"
                  value={Address}
                />
              </FormItem>
              <FormItem htmlFor="company-admin-facebook" label="Facebook">
                <Input
                  id="company-admin-facebook"
                  name="company-admin-facebook"
                  onChange={(e) => updateFields({ Facebook: e.target.value })}
                  placeholder="Facebook"
                  value={Facebook}
                />
              </FormItem>
              <FormItem htmlFor="company-admin-linkedin" label="LinkedIn">
                <Input
                  id="company-admin-linkedin"
                  name="company-admin-linkedin"
                  onChange={(e) => updateFields({ Linkedin: e.target.value })}
                  placeholder="LinkedIn"
                  value={Linkedin}
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
                  onChange={(e) => updateFields({ CountryId: e.target.value })}
                  value={CountryId}
                />
              </FormItem>
              <FormItem htmlFor="company-admin-instagram" label="Instagram">
                <Input
                  id="company-admin-instagram"
                  name="company-admin-instagram"
                  onChange={(e) => updateFields({ Instagram: e.target.value })}
                  placeholder="Instagram"
                  value={Instagram}
                />
              </FormItem>
              <FormItem htmlFor="company-admin-tiktok" label="TikTok">
                <Input
                  id="company-admin-tiktok"
                  name="company-admin-tiktok"
                  onChange={(e) => updateFields({ TikTok: e.target.value })}
                  placeholder="TikTok"
                  value={TikTok}
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
                onChange={(e) => updateFields({ Work: e.target.value })}
                placeholder="Type here..."
                value={Work}
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
                onChange={(e) => updateFields({ Connect: e.target.value })}
                placeholder="Type here..."
                value={Connect}
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
                onChange={(e) => updateFields({ Support: e.target.value })}
                placeholder="Type here..."
                value={Support}
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
                onChange={(e) => updateFields({ Other_Notes: e.target.value })}
                placeholder="Type here..."
                value={Other_Notes}
              />
            </FormItem>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
