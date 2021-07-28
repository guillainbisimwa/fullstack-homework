require 'rails_helper'

RSpec.describe 'HumusBalances API', type: :request do

  describe 'POST /humus_balance' do
    
    let(:body) { FieldsService.instance.fetch_fields.to_json }
    let(:header) {{ 'Content-Type' => 'application/json' }}

    context 'when request attributes are valid' do
      before { post "/humus_balance", params: body, headers: header }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when request attributes are not valid' do
      before { post "/humus_balance", params: body }

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end
end