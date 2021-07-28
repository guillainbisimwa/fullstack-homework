class HumusBalanceController < ApplicationController
    skip_before_action :verify_authenticity_token

    include HumusBalanceHelper

    def create
        fields_data = params[:_json]
        
        return unless fields_data.present?
        
        humus_balance = fields_data.map { |field| { id: field[:id], delta: calc_balance(field[:crops])}}
        render json: humus_balance
      end
          
end
