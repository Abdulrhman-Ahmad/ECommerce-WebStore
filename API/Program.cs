using Core.IRepositories;
using Core.Models;
using Infrastructure;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// inject the dbcontext
var DefaultConnection = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ECommerceDBContext>(Options =>
    Options.UseSqlServer(
            DefaultConnection,
            b => b.MigrationsAssembly(typeof(ECommerceDBContext).Assembly.FullName))
);

#region inject the repository
builder.Services.AddScoped(typeof(IProductRepository), typeof(ProductRepository));
builder.Services.AddScoped(typeof(IReviewRepository), typeof(ReviewRepository));
builder.Services.AddScoped(typeof(ICategoryRepository), typeof(CategoryRepository));
builder.Services.AddScoped(typeof(IWishlistRepository), typeof(WishlistRepository));
builder.Services.AddScoped(typeof(IFavouriteRepository), typeof(FavouriteRepository));
builder.Services.AddScoped(typeof(IUserRepository), typeof(UserRepository));
#endregion



#region Identity
builder.Services.AddIdentity<User, IdentityRole<int>>(Options =>
{
    Options.User.RequireUniqueEmail = true;
    Options.Password.RequiredLength = 8;
    Options.Lockout.MaxFailedAccessAttempts = 5;
    Options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromSeconds(20);


}).AddEntityFrameworkStores<ECommerceDBContext>();
#endregion

#region Authentication
builder.Services.AddAuthentication(Options =>
{
    Options.DefaultAuthenticateScheme = "Default";
    Options.DefaultChallengeScheme = "Default";
})
.AddJwtBearer("Default", options =>
{
  var KeyString = builder.Configuration.GetValue<string>("SecretKey");
  var KeyInBytes = Encoding.ASCII.GetBytes(KeyString);
  var Key = new SymmetricSecurityKey(KeyInBytes);
  options.TokenValidationParameters = new TokenValidationParameters
  {
      IssuerSigningKey = Key,
      ValidateIssuer = false,
      ValidateAudience = false
  };
}).AddGoogle(googleOptions =>
{
    googleOptions.ClientId = builder.Configuration.GetSection("GoogleAuthenSetting").GetValue<string>("ClientId");
    googleOptions.ClientSecret = builder.Configuration.GetSection("GoogleAuthenSetting").GetValue<string>("ClientSecret");
});

#endregion

#region Authorization
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("user", policy => policy
    .RequireClaim(ClaimTypes.Role, "Client")
    .RequireClaim(ClaimTypes.NameIdentifier)
    );
});
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(c => c
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin());

app.UseAuthentication();
app.UseAuthorization();
// for images
app.UseStaticFiles();
app.MapControllers();

app.Run();
