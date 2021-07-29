require 'rails_helper'

RSpec.describe HumusBalanceHelper, type: :helper do
  let(:body) { FieldsService.instance.fetch_fields }
  let(:tab) { [] }
  let(:autre) {body.map { |field| tab.push(field[:crops])}}

    describe "calculate humus balance" do
      it "returns status code -3.9" do
        expect(helper.calc_balance(autre[0][0])).to eq(-3.9)
      end
    end
end
