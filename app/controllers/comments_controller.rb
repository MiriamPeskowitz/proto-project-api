class CommentsController < ApplicationController


  def index
    @soupkitchens = Soupkitchen.all
    @comments = Comment.all
    @users = User.all
    render json: @soupkitchens, status: 200 
  end

  def new 

    @comment = Comment.new  
    @soupkitchen = Soupkitchen.find(params[:soupkitchen_id]) 
    # render json: @comment, status: 200 
    response_to do |format|
    # fix this 
      format.html {render :new}
      format.json {render json: @comment, status: 200}
    end 
    if !logged_in?
      flash[:notice] = "You must be logged in"
    end 
  end 


  def create
    if logged_in?
      @soupkitchen = Soupkitchen.find(params[:soupkitchen_id])
      @comment = @soupkitchen.comments.build(comment_params)
     
      render json: @comment, status: 201
     

      if @comment.save 
        flash[:notice] = "Thanks! We added your comment."
        render json: @comment, status: 201
        # redirect_to soupkitchen_path(@soupkitchen)
      else 
        flash.now[:notice] = "Something went wrong, try again."  
        # render 'soupkitchens/show' message: Message
      end
    else
      flash[:notice] = "Gotta' log in to leave a review." 
      # redirect_to root_path -- delete, because it's now just the same page? 
    end
  end


  def show
    @comments = Comment.all
    render json: @comments, status: 201
  end 

  private 
  def comment_params
    params.require(:comment).permit(:title, :content, :soupkitchen_id, :user_id)
  end

  def set_comment
     @comment = Comment.find(params[:id])
  end
end

