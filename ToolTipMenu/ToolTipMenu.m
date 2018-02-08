#import "ToolTipMenu.h"
#import "RCTToolTipText.h"
#import <React/RCTUIManager.h>

@implementation ToolTipMenu

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(show:(nonnull NSNumber *)reactTag
                  items: (NSArray *)items
                  arrowDirection: (NSString *)arrowDirection)
{
    UIView *view = [self.bridge.uiManager viewForReactTag:reactTag];
    NSArray *buttons = items;
    NSMutableArray *menuItems = [NSMutableArray array];
    for (NSString *buttonText in buttons) {
        NSString *sel = [NSString stringWithFormat:@"magic_%@", buttonText];
        [menuItems addObject:[[UIMenuItem alloc]
                              initWithTitle:buttonText
                              action:NSSelectorFromString(sel)]];
    }
    [view becomeFirstResponder];
    UIMenuController *menuCont = [UIMenuController sharedMenuController];
    [menuCont setTargetRect:view.frame inView:view.superview];

    [[NSNotificationCenter defaultCenter] addObserver:view selector:@selector(didHideMenu:) name:UIMenuControllerDidHideMenuNotification object:nil];


    if([arrowDirection isEqualToString: @"up"]){
      menuCont.arrowDirection = UIMenuControllerArrowUp;
    }else if ([arrowDirection isEqualToString: @"right"]){
      menuCont.arrowDirection = UIMenuControllerArrowRight;
    }else if ([arrowDirection isEqualToString: @"left"]) {
      menuCont.arrowDirection = UIMenuControllerArrowLeft;
    } else {
      menuCont.arrowDirection = UIMenuControllerArrowDown;
    }
    menuCont.menuItems = menuItems;
    [menuCont setMenuVisible:YES animated:YES];
}

RCT_EXPORT_METHOD(hide){   
    UIMenuController *menuCont = [UIMenuController sharedMenuController];
    [menuCont setMenuVisible:NO animated:NO];
}

@end
