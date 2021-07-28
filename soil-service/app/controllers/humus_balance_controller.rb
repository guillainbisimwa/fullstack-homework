class HumusBalanceController < ApplicationController

    def get_balances
        fields_data = params[:_json]
        return unless fields_data.present?
    
        humus_balance = fields_data.map { |field| { field_id: field[:id], humus_balance: calc_balance(field[:crops])}}
        render json: humus_balance
      end
          
end
