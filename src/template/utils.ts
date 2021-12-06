/**
 * 生成表格列
 * @param json 剪切板中的文本
 * @returns 生成好的表格模板
 */
export function createTableColumn(json: string) {
  try {
    let jsonData = JSON.parse(json);


    const createTpl = (json: any) => {
      let tpl = ``;

      for (const key in json) {
        tpl += `
				<el-table-column prop="${key}" label="${json[key]}">
					<template slot-scope="scope">
						{{ scope.row.${key} | emptyDisplay }}
					</template>
				</el-table-column>
        `;
      }

      return tpl;
    };

    let cols = createTpl(jsonData);

    return cols;
  } catch (error) {
    return '';
  }
}

/**
 * 生成表单项
 * @param text 剪切板中的文本
 * @returns 生成好的表格模板
 */
export function createFormItem(json: string) {

  try {
    let jsonData = JSON.parse(json);

    const createTpl = (json: any) => {
      let tpl = ``;

      for (const key in json) {
        tpl += `
				<el-col :span="24">
          <el-form-item prop="${key}">
            <template #label>
              <i class="iconfont icon-account"></i>
            </template>
            <el-input v-model.trim="form.${key}" placeholder="${json[key]}" maxlength="30" clearable></el-input>
          </el-form-item>
        </el-col>
        `;
      }

      return tpl;
    };

    let cols = createTpl(jsonData);

    return cols;
  } catch (error) {
    return '';
  }
}

/**
 * 生成qf-label
 * @param text 剪切板中的文本
 * @returns 生成好的表格模板
 */
export function createQfLabel(json: string) {

  try {
    let jsonData = JSON.parse(json);

    const createTpl = (json: any) => {
      let tpl = ``;

      for (const key in json) {
        tpl += `
        <qf-label label="${json[key]}">{{pageData.${key}  | emptyDisplay}}</qf-label>
        `;
      }

      return tpl;
    };

    let cols = createTpl(jsonData);

    return cols;
  } catch (error) {
    return '';
  }
}