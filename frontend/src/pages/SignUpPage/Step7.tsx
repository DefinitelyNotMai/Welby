import { Flex, Grid } from "@chakra-ui/react";
import FormItem from "../../components/Form/FormItem";
import Input from "../../components/Form/Input";
import { SelectCountry } from "../../components/Form/Select";
import Textarea from "../../components/Form/Textarea";
import Heading from "../../components/Typography/Heading";

type Step7Data = {
  adminAddress: string;
  adminCountryId: string;
  adminFacebook: string;
  adminInstagram: string;
  adminLinkedIn: string;
  adminTikTok: string;
  adminWork: string;
  adminConnect: string;
  adminSupport: string;
  adminOtherNotes: string;
};

type Step7Props = Step7Data & {
  updateFields: (fields: Partial<Step7Data>) => void;
};

const Step7 = ({
  adminAddress,
  adminCountryId,
  adminFacebook,
  adminInstagram,
  adminLinkedIn,
  adminTikTok,
  adminWork,
  adminConnect,
  adminSupport,
  adminOtherNotes,
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
                  onChange={(e) =>
                    updateFields({ adminAddress: e.target.value })
                  }
                  placeholder="Address"
                  type="text"
                  value={adminAddress}
                />
              </FormItem>
              <FormItem htmlFor="company-admin-facebook" label="Facebook">
                <Input
                  id="company-admin-facebook"
                  name="company-admin-facebook"
                  onChange={(e) =>
                    updateFields({ adminFacebook: e.target.value })
                  }
                  placeholder="Facebook"
                  type="text"
                  value={adminFacebook}
                />
              </FormItem>
              <FormItem htmlFor="company-admin-linkedin" label="LinkedIn">
                <Input
                  id="company-admin-linkedin"
                  name="company-admin-linkedin"
                  onChange={(e) =>
                    updateFields({ adminLinkedIn: e.target.value })
                  }
                  placeholder="LinkedIn"
                  type="text"
                  value={adminLinkedIn}
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
                  onChange={(e) =>
                    updateFields({ adminCountryId: e.target.value })
                  }
                  value={adminCountryId}
                />
              </FormItem>
              <FormItem htmlFor="company-admin-instagram" label="Instagram">
                <Input
                  id="company-admin-instagram"
                  name="company-admin-instagram"
                  onChange={(e) =>
                    updateFields({ adminInstagram: e.target.value })
                  }
                  placeholder="Instagram"
                  type="text"
                  value={adminInstagram}
                />
              </FormItem>
              <FormItem htmlFor="company-admin-tiktok" label="TikTok">
                <Input
                  id="company-admin-tiktok"
                  name="company-admin-tiktok"
                  onChange={(e) =>
                    updateFields({ adminTikTok: e.target.value })
                  }
                  placeholder="TikTok"
                  type="text"
                  value={adminTikTok}
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
                onChange={(e) => updateFields({ adminWork: e.target.value })}
                placeholder="Type here..."
                value={adminWork}
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
                onChange={(e) => updateFields({ adminConnect: e.target.value })}
                placeholder="Type here..."
                value={adminConnect}
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
                onChange={(e) => updateFields({ adminSupport: e.target.value })}
                placeholder="Type here..."
                value={adminSupport}
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
                onChange={(e) =>
                  updateFields({ adminOtherNotes: e.target.value })
                }
                placeholder="Type here..."
                value={adminOtherNotes}
              />
            </FormItem>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Step7;
