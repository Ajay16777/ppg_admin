import React, { useState } from "react";
import { InputNumber } from "antd";
// reactstrap components
import {
  Input,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Label,
  Table,
} from "reactstrap";
// Api
import Dataservices from "../../services/requestApi";
import queryString from "query-string";
const AllCategory = ({ allcategory, updatecategory, status, deletecat }) => {
  const [value, setValue] = useState("0");
  const sequence = async (id, val) => {
    try {
      const Data = {
        sequence: value,
      };
      await Dataservices.CategoryUpdate(id, queryString.stringify(Data));
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Category Name</th>
            <th scope="col">Sequence</th>
            <th scope="col">Status</th>
            <th scope="col" className="text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {allcategory &&
            allcategory.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <th scope="row">
                  <Media className="align-items-center">
                    <Media>
                      <span className="mb-0 text-sm">{item.category}</span>
                    </Media>
                  </Media>
                </th>
                <td>
                  <InputNumber
                    min={1}
                    max={allcategory.length}
                    size="small"
                    defaultValue={item.sequence}
                    onChange={(value) => setValue(value)}
                    onPressEnter={() => sequence(item._id)}
                  />
                </td>
                <td>
                  <Label className="custom-toggle custom-toggle-warning">
                    <Input
                      onClick={(e) => status(e, item)}
                      defaultChecked={item.status}
                      type="checkbox"
                    />
                    <span
                      className="custom-toggle-slider rounded-circle"
                      data-label-off="Off"
                      data-label-on="On"
                    />
                  </Label>
                </td>

                <td className="text-right">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-icon-only text-light"
                      href="#pablo"
                      role="button"
                      size="sm"
                      color=""
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem onClick={(e) => updatecategory(item)}>
                        <i className="fas fa-edit text-primary" /> Edit
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => deletecat(e, item._id)}
                      >
                        <i className="fas fa-trash text-danger" />
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default AllCategory;
