#import "ToolTipMenu.h"

#import "RCTToolTipText.h"
#import "RCTSparseArray.h"
#import "RCTUIManager.h"

@implementation ToolTipMenu

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(show:(NSNumber *)reactTag
                  items: (NSArray *)items)
{
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, RCTSparseArray *viewRegistry) {
        
        RCTToolTipText *view = viewRegistry[reactTag];
        if (!view) {
            RCTLogError(@"Cannot find view with tag #%@", reactTag);
            return;
        }
        
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
        menuCont.arrowDirection = UIMenuControllerArrowDown;
        menuCont.menuItems = menuItems;
        [menuCont setMenuVisible:YES animated:YES];
    }];
}

@end
