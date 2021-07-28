import { PureComponent } from 'react'
import { sortBy } from 'lodash'

import CropSelect from './CropSelect'
import { Crop, Field, SeasonalCrop, Humus } from './types'
import { fetchCrops, fetchFields, postHumus } from './api'
import buildNewFieldsState from './buildNewFieldsState'

type Props = {}

type State = {
  allCrops: Array<Crop>,
  fields: Array<Field>,
  humusBalances: Array<Humus>
}

export default class Table extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      allCrops: [],
      fields: [],
      humusBalances: [],
    }
  }

  componentDidMount = async () => {
    const fields = await fetchFields();
    const humusBalances = await postHumus(fields);

    console.log(humusBalances);
    

    this.setState({
      allCrops: await fetchCrops(),
      fields,
      humusBalances,
    })
  }

  render = () =>
    <div className="table">
      <div className="table__row table__row--header">
        <div className="table__cell">Field name</div>
        <div className="table__cell table__cell--right">Field area (ha)</div>
        <div className="table__cell table__cell--center">2020 crop</div>
        <div className="table__cell table__cell--center">2021 crop</div>
        <div className="table__cell table__cell--center">2022 crop</div>
        <div className="table__cell table__cell--center">2023 crop</div>
        <div className="table__cell table__cell--center">2024 crop</div>
        <div className="table__cell table__cell--right">Humus balance</div>
      </div>

      {sortBy(this.state.fields, field => field.name).map(field => this.renderFieldRow(field))}
    </div>

  renderFieldRow = (field: Field) => {

    const humusBalance: Humus | any = this.state.humusBalances.find((balance) => balance.id === field.id);

    return(
      <div className="table__row" key={field.id}>
        <div className="table__cell">{field.name}</div>
        <div className="table__cell table__cell--right">{field.area}</div>

        {sortBy(field.crops, crop => crop.year).map(seasonalCrop => this.renderCropCell(field, seasonalCrop))}

        <div className="table__cell table__cell--right">
          {humusBalance.delta}
        </div>
      </div>
    );
  }

  renderCropCell = (field: Field, seasonalCrop: SeasonalCrop) =>
    <div className="table__cell table__cell--center table__cell--with-select">
      <CropSelect
        selectedCrop={seasonalCrop.crop}
        allCrops={this.state.allCrops}
        onChange={newCrop => this.changeFieldCrop(newCrop, field.id, seasonalCrop.year)}
      />
    </div>

  changeFieldCrop = async (newCrop: Crop | null, fieldId: number, cropYear: number) => {
    const updatedFields = buildNewFieldsState(this.state.fields, newCrop, fieldId, cropYear)
    const newBalances = await postHumus(updatedFields.fields)

    this.setState({
      ...updatedFields,
      humusBalances: newBalances,
    })
  }
}
