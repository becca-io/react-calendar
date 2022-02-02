import { isRenderer, RendererModel, TableModel } from '../types/table'

export function transToRendererModel<Row>(
  model: TableModel<Row>,
): RendererModel<Row> {
  return model.map(x => {
    return {
      ...x,
      accessor: Array.isArray(x.accessor) ? transToRendererModel(x.accessor) : x.accessor,
      header: isRenderer(x.head) ? x.head: x.head?.render,
      cell: isRenderer(x.cell) ? x.cell : x.cell?.render,
      footer: isRenderer(x.foot) ? x.foot : x.foot?.render,
      rules: {
        mergeRow: isRenderer(x.cell) ? undefined : x.cell?.mergeRow,
        colSpanAs: isRenderer(x.cell) ? undefined : x.cell?.colSpanAs,
        extendsFooter: isRenderer(x.foot) ? undefined : x.foot?.extends,
      },
    }
  })
}
