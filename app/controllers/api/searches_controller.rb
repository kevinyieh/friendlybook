class Api::SearchesController < ApplicationController
    def index
        debugger
        @search_results = User.select("users.*")
                            .where("CONCAT(users.first_name,' ',users.last_name) LIKE ? ","%#{search_params["query"]}%")
        render :index
    end

    private
    def search_params
        params.require(:search).permit(:query)
    end
end