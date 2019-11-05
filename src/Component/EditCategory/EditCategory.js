import React from "react";
import s from "./EditCategory.module.css";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { API } from "../../Service/API";
import { Redirect } from "react-router-dom";
import { EditCategoryForm } from "./EditCategoryForm";

export class EditCategory extends React.Component {
  state = {
    initValues: { nameCategory: "", slugCategory: "", parent: "" },
    redirect: false,
    errors: {}
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    API.getCategory(id).then(res => {
      if (res.status === 200) {
        let initValues = {
          nameCategory: res.body.name,
          slugCategory: res.body.slug,
          parent: res.body.parent
            ? { label: res.body.parent.name, value: res.body.parent.id }
            : null
        };
        this.setState({
          initValues
        });
      }
    });
  }

  editCategory = async values => {
    let name = values.nameCategory;
    let slug = values.slugCategory || values.nameCategory;
    let id = this.props.match.params.id;
    let parentId = values.parent ? values.parent.value : null;
    API.editCategory(id, name, slug, parentId).then(res => {
      if (res.status === 200) {
        this.props.showMessageEvent("Success. Category edited");
        this.setState({
          redirect: true,
          errors: {}
        });
      } else {
        this.setState({
          errors: res.body.errors
        });
      }
    });
  };

  handleSubmit = values => {
    this.editCategory(values);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/admin/category" />;
    }

    return (
      <div className={s.wrapper}>
        <Link to={"/admin/category"}>
          <Button className={`btn-lg btn-secondary ${s.btn}`}>Back</Button>
        </Link>
        <h2 className="text-center">Edit Category</h2>
        <div className={s.form_wrapper}>
          <EditCategoryForm
            errors={this.state.errors}
            onSubmit={this.handleSubmit}
            initialValues={this.state.initValues}
          />
        </div>
      </div>
    );
  }
}
