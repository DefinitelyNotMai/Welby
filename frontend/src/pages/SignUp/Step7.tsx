import { Flex, Grid, Heading } from "@chakra-ui/react";
import CustomText from "../../components/CustomText";
import {
  CustomTextarea,
  CustomTextbox,
} from "../../components/Form/CustomInput";
import { SelectCountry } from "../../components/Form/CustomSelect";
import FormItem from "../../components/Form/FormItem";

type Step7Data = {
  AdminAddress: string;
  AdminCountryId: string;
  AdminFacebook: string;
  AdminInstagram: string;
  AdminLinkedIn: string;
  AdminTikTok: string;
  AdminWork: string;
  AdminConnect: string;
  AdminSupport: string;
  AdminOtherNotes: string;
};

type Step7Props = Step7Data & {
  updateFields: (fields: Partial<Step7Data>) => void;
};

const Step7 = ({
  AdminAddress,
  AdminCountryId,
  AdminFacebook,
  AdminInstagram,
  AdminLinkedIn,
  AdminTikTok,
  AdminWork,
  AdminConnect,
  AdminSupport,
  AdminOtherNotes,
  updateFields,
}: Step7Props) => {
  return (
    <Flex flexDirection="column" padding={8}>
      <Heading as="h1" fontSize="2xl" marginBottom={8} textAlign="center">
        <CustomText fontWeight="bold">Tell more about yourself</CustomText>
      </Heading>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <Flex flexDirection="column" width={["100%", "80%", "60%"]}>
          <Grid templateColumns="1fr 1fr" gap="4">
            <Flex flexDirection="column" gap={4}>
              <FormItem htmlFor="address" label="Address" isRequired>
                <CustomTextbox
                  autoComplete="none"
                  id="address"
                  name="address"
                  onChange={(e) =>
                    updateFields({ AdminAddress: e.target.value })
                  }
                  placeholder="Address"
                  type="text"
                  value={AdminAddress}
                />
              </FormItem>
              <FormItem htmlFor="facebook" label="Facebook">
                <CustomTextbox
                  autoComplete="none"
                  id="facebook"
                  name="facebook"
                  placeholder="Facebook"
                  onChange={(e) =>
                    updateFields({ AdminFacebook: e.target.value })
                  }
                  type="text"
                  value={AdminFacebook}
                />
              </FormItem>
              <FormItem htmlFor="linkedin" label="LinkedIn">
                <CustomTextbox
                  autoComplete="none"
                  id="linkedin"
                  name="linkedin"
                  onChange={(e) =>
                    updateFields({ AdminLinkedIn: e.target.value })
                  }
                  placeholder="LinkedIn"
                  type="text"
                  value={AdminLinkedIn}
                />
              </FormItem>
            </Flex>
            <Flex flexDirection="column" gap={4}>
              <FormItem htmlFor="" label="Country" isRequired>
                <SelectCountry
                  value={AdminCountryId}
                  onClick={(selectedCountryId) =>
                    updateFields({ AdminCountryId: selectedCountryId })
                  }
                />
              </FormItem>
              <FormItem htmlFor="instagram" label="Instagram">
                <CustomTextbox
                  autoComplete="none"
                  id="instagram"
                  name="instagram"
                  onChange={(e) =>
                    updateFields({ AdminInstagram: e.target.value })
                  }
                  placeholder="Instagram"
                  type="text"
                  value={AdminInstagram}
                />
              </FormItem>
              <FormItem htmlFor="tiktok" label="TikTok">
                <CustomTextbox
                  autoComplete="none"
                  id="tiktok"
                  name="tiktok"
                  onChange={(e) =>
                    updateFields({ AdminTikTok: e.target.value })
                  }
                  placeholder="TikTok"
                  type="text"
                  value={AdminTikTok}
                />
              </FormItem>
            </Flex>
          </Grid>
          <Flex flexDirection="column" marginTop={4} gap={4}>
            <FormItem htmlFor="work" label="How do you work?" isRequired>
              <CustomTextarea
                id="work"
                name="work"
                onChange={(e) => updateFields({ AdminWork: e.target.value })}
                placeholder="Type here..."
                value={AdminWork}
              />
            </FormItem>
            <FormItem
              htmlFor="connect"
              label="How do you connect and learn?"
              isRequired
            >
              <CustomTextarea
                id="connect"
                name="connect"
                onChange={(e) => updateFields({ AdminConnect: e.target.value })}
                placeholder="Type here..."
                value={AdminConnect}
              />
            </FormItem>
            <FormItem
              htmlFor="support"
              label="What do you need support in?"
              isRequired
            >
              <CustomTextarea
                id="support"
                name="support"
                onChange={(e) => updateFields({ AdminSupport: e.target.value })}
                placeholder="Type here..."
                value={AdminSupport}
              />
            </FormItem>
            <FormItem htmlFor="notes" label="Other notes about yourself">
              <CustomTextarea
                id="notes"
                name="notes"
                onChange={(e) =>
                  updateFields({ AdminOtherNotes: e.target.value })
                }
                placeholder="Type here..."
                value={AdminOtherNotes}
              />
            </FormItem>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Step7;
