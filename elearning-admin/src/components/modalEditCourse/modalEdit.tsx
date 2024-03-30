import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import "./modalEdit.css";
import { MdAddPhotoAlternate } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";
import { ToastContainer } from "react-toastify";
import { Popconfirm } from "antd";
import CourseService from "../../services/course.service";
import { ToastSuccess, ToastWarning } from "../../common/toastify.common";
interface Props {
  offModalEdit: Function;
  dataEdit: any;
}

const ModalEdit = (props: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  // Set avatar
  const [avatars, setAvatars] = useState<any>();
  const [fileUpdate, setFile] = useState<any>();
  const handleAvatar = (e: any) => {
    let file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatars(file);
    setFile(file);
  };
  useEffect(() => {
    return () => {
      avatars && URL.revokeObjectURL(avatars.preview);
    };
  }, [avatars]);
  const [updateData, setUpdateData] = useState(props.dataEdit);
  // Update
  const dispatch = useDispatch();
  const handleOpenEdit = (e: MouseEvent<HTMLElement>) => {
    const spanElements = e.target as HTMLElement;
    const inputElements = spanElements.parentElement?.querySelector(
      "input"
    ) as HTMLInputElement;
    spanElements.style.fontSize = "20px";
    spanElements.style.color = "#000";
    inputElements.style.border = "1px solid #000";
    inputElements.removeAttribute("disabled");
  };
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };
  const courseService = new CourseService();
  const handleUpdateProduct = async (id: number) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", updateData.name);
    formData.append("allergens", updateData.allergens);
    formData.append("desc", updateData.desc);
    formData.append("ingredients", updateData.ingredients);
    formData.append("price", updateData.price);
    formData.append("stock", updateData.stock);
    formData.append("courses", fileUpdate);
    const result = await courseService.updateCourse(id, formData);
    if (result === 1) {
      props.offModalEdit();
      dispatch(update());
      setIsLoading(false);
      ToastSuccess("Updated course successfully");
    } else {
      setIsLoading(false);
      ToastWarning("Product update failed");
    }
  };

  return (
    <div className="modalEditOverlay">
      <div className="modalEdit">
        <div className="modalEditImg">
          <img
            src={avatars?.preview ? avatars.preview : props.dataEdit.images}
            alt=""
          />
          <div className="selectFile">
            <label htmlFor="photo">
              <MdAddPhotoAlternate />
            </label>
            <input
              onChange={handleAvatar}
              style={{ display: "none" }}
              type="file"
              name=""
              id="photo"
            />
          </div>
        </div>
        <div className="modalEditInputs">
          <div className="modalEditInput">
            <input
              value={updateData.name}
              onChange={handleChangeInput}
              disabled
              type="text"
              name="name"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
          <div className="modalEditInput">
            <input
              value={updateData.desc}
              onChange={handleChangeInput}
              disabled
              type="text"
              name="desc"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
          <div className="modalEditInput">
            <input
              value={updateData.ingredients}
              onChange={handleChangeInput}
              disabled
              type="text"
              name="ingredients"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
          <div className="modalEditInput">
            <input
              value={updateData.allergens}
              onChange={handleChangeInput}
              disabled
              type="text"
              name="allergens"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
          <div className="modalEditInput">
            <input
              value={updateData.price}
              onChange={handleChangeInput}
              disabled
              type="text"
              name="price"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
          <div className="modalEditInput">
            <input
              value={updateData.stock}
              onChange={handleChangeInput}
              disabled
              type="text"
              name="stock"
              id=""
            />
            <span onClick={handleOpenEdit}>edit</span>
          </div>
        </div>
        <div className="modalEditActions">
          <Popconfirm
            title="Update "
            description="Are you sure about this information?"
            onConfirm={() => handleUpdateProduct(props.dataEdit.id)}
            okText="Yes"
            cancelText="No"
          >
            <button>UPDATE</button>
          </Popconfirm>
          <button onClick={() => props.offModalEdit()}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
