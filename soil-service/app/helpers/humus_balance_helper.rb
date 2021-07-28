module HumusBalanceHelper
    YEAR_FACTOR = 1 * 3

    def calc_balance(crops_data)
        sorted_crops = crops_data.sort_by { |crop| crop[:crop][:year] }
        balance = 0

        sorted_crops.each do |crop|
          humus_delta = crop[:crop][:humus_delta]
          humus_delta  *=  YEAR_FACTOR
          balance += humus_delta 
        end
        balance.round(2)
      end
end
