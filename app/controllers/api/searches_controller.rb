class Api::SearchesController < ApplicationController
    def index
        @search_results = {};
        if search_params["query"].length > 0
            @search_results = User.select("users.*")
                                .where("CONCAT(LOWER(users.first_name),' ',LOWER(users.last_name)) LIKE ? ",
                                "%#{search_params["query"].downcase}%")
        end
        render :index
    end

    private
    def search_params
        params.require(:search).permit(:query)
    end
end