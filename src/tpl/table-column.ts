/**
 * 生成表格列
 * @param text 剪切板中的文本
 * @returns 生成好的表格模板
 */
export function createColumn(text: any) {
  try {
    let jsonData = JSON.parse(text);


    const createTpl = (json: any) => {
      let tpl = ``;

      for (const key in json) {
        tpl += `
				<el-table-column prop="${key}" label="${json[key]}">
					<template slot-scope="scope">
						{{ scope.row.${key} }}
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