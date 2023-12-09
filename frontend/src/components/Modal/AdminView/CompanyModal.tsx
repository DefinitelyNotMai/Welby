import { Button, Flex, Grid, Input, Text, Textarea } from "@chakra-ui/react";
import { AdminViewModal } from "./AdminViewModal";
import { SelectCountry, SelectIndustryType } from "../../Form/Select";
import { FormItem } from "../../Form/FormItem";
import { UploadPhoto } from "../../Form/UploadPhoto";

type CompanyData = {
  CompanyId: number;
  Logo: string;
  Name: string;
  Email: string;
  Phone_Number: string;
  Website: string;
  Vision: string;
  Mission: string;
  CountryId: number;
  IndustryTypeId: number;
  FoundingDate: string;
};

type CompanyAddUpdateProps = CompanyData & {
  handleAddUpdate: () => void;
  handleCancel: () => void;
  isOpen: boolean;
  onClose: () => void;
  updateFields: (fields: Partial<CompanyData>) => void;
};

const CompanyAdd = ({ isOpen, onClose }: CompanyAddUpdateProps) => {
  //<UploadPhoto id="company-logo" name="company-logo" label="Company Logo" />
  //<FormItem isRequired></FormItem>
  return (
    <AdminViewModal header="Add Company" isOpen={isOpen} onClose={onClose}>
      CompanyAdd
    </AdminViewModal>
  );
};

const CompanyUpdate = ({
  Logo,
  Name,
  Email,
  Phone_Number,
  Website,
  Vision,
  Mission,
  CountryId,
  IndustryTypeId,
  FoundingDate,
  handleAddUpdate,
  handleCancel,
  isOpen,
  onClose,
  updateFields,
}: CompanyAddUpdateProps) => {
  return (
    <AdminViewModal header="Update Company" isOpen={isOpen} onClose={onClose}>
      <Flex flexDirection="column" gap={4}>
        <FormItem htmlFor="company-logo">
          <UploadPhoto
            id="company-logo"
            name="company-logo"
            label="Company Logo"
            onChange={(e) => updateFields({ Logo: e })}
            value={Logo}
            buttonWidth={["50%", "25%"]}
          />
        </FormItem>
        <Grid templateColumns="1fr 1fr" gap={4}>
          <Flex flexDirection="column" gap={4}>
            <FormItem htmlFor="company-email" label="Email">
              <Input
                id="company-email"
                name="company-email"
                onChange={(e) => updateFields({ Email: e.target.value })}
                placeholder="Email"
                type="email"
                value={Email}
              />
            </FormItem>
            <FormItem htmlFor="company-website" label="Website">
              <Input
                id="company-website"
                name="company-website"
                onChange={(e) => updateFields({ Website: e.target.value })}
                placeholder="Website"
                type="text"
                value={Website}
              />
            </FormItem>
            <FormItem htmlFor="company-vision" label="Vision">
              <Textarea
                id="company-vision"
                height="1rem"
                name="company-vision"
                onChange={(e) => updateFields({ Vision: e.target.value })}
                placeholder="Vision"
                value={Vision}
              />
            </FormItem>
            <FormItem htmlFor="company-country" label="Country">
              <SelectCountry
                id="company-country"
                name="company-country"
                onChange={(e) =>
                  updateFields({ CountryId: parseInt(e.target.value) })
                }
                value={CountryId}
              />
            </FormItem>
          </Flex>
          <Flex flexDirection="column" gap={4}>
            <FormItem htmlFor="company-name" label="Name">
              <Input
                id="company-name"
                name="company-name"
                onChange={(e) => updateFields({ Name: e.target.value })}
                placeholder="Name"
                type="text"
                value={Name}
              />
            </FormItem>
            <FormItem htmlFor="company-phone-number" label="Phone Number">
              <Input
                id="company-phone-number"
                name="company-phone-number"
                onChange={(e) => updateFields({ Phone_Number: e.target.value })}
                placeholder="09123456789"
                type="text"
                value={Phone_Number}
              />
            </FormItem>
            <FormItem htmlFor="company-mission" label="Mission">
              <Textarea
                id="company-mission"
                height="1rem"
                name="company-mission"
                onChange={(e) => updateFields({ Mission: e.target.value })}
                placeholder="Mission"
                value={Mission}
              />
            </FormItem>
            <FormItem htmlFor="company-industry" label="Industry Type">
              <SelectIndustryType
                id="company-industry"
                name="company-industry"
                onChange={(e) =>
                  updateFields({ IndustryTypeId: parseInt(e.target.value) })
                }
                value={IndustryTypeId}
              />
            </FormItem>
          </Flex>
        </Grid>
        <FormItem htmlFor="company-founding-date" label="Founding Date">
          <Input
            id="company-founding-date"
            name="company-founding-date"
            onChange={(e) => updateFields({ FoundingDate: e.target.value })}
            placeholder="yyyy-mm-dd"
            type="date"
            value={FoundingDate}
          />
        </FormItem>
        <Flex flexDirection="row" gap={8}>
          <Button variant="submit" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddUpdate}>
            Update
          </Button>
        </Flex>
      </Flex>
    </AdminViewModal>
  );
};

type CompanyDeleteProps = CompanyData & {
  handleCancel: () => void;
  handleDelete: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const CompanyDelete = ({
  handleCancel,
  handleDelete,
  isOpen,
  onClose,
  Name,
}: CompanyDeleteProps) => {
  return (
    <AdminViewModal header="Delete Company" isOpen={isOpen} onClose={onClose}>
      <Flex flexDirection="column" gap={8}>
        <Text color="white" textAlign="center">
          Are you sure you want to delete {Name}?
        </Text>
        <Flex flexDirection="row" gap={8}>
          <Button variant="submit" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Flex>
      </Flex>
    </AdminViewModal>
  );
};

export { CompanyAdd, CompanyUpdate, CompanyDelete };
